import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Formik} from 'formik';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css'
import {theme} from "../../components/theme";
import {postAuth} from "../../api";
import {selectIsAuth, setLogin} from "../../redux/userSlice";

import {Button, Checkbox, FormControlLabel, Paper,
    TextField, ThemeProvider, Typography} from "@mui/material";




const Login = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const rememberedEmail = window.localStorage.getItem('rememberedEmail')
        const rememberedPassword = window.localStorage.getItem('rememberedPassword')

        if (rememberedEmail && rememberedPassword) {
            setRememberMe(true)
        }
    }, [])

    const handleRememberMe = (event) => {
        setRememberMe(event.target.checked)
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const authUser = await postAuth(values)
            dispatch(setLogin(authUser))

            if ('token' in authUser) {
                window.localStorage.setItem('token', authUser.token)
            }

            if (rememberMe) {
                window.localStorage.setItem('rememberedEmail', values.email)
                window.localStorage.setItem('rememberedPassword', values.password)
            } else {
                window.localStorage.removeItem('rememberedEmail')
                window.localStorage.removeItem('rememberedPassword')
            }

            setSubmitting(false)
            resetForm()
            setError('')
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])

    return (
        <Formik
            initialValues={{
                email: window.localStorage.getItem('rememberedEmail') || '',
                password: window.localStorage.getItem('rememberedPassword') || ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required'
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <Paper classes={{root: styles.root}}>
                        <Typography classes={{root: styles.title}} component='span' variant='h5'>
                            Sing in to fun club
                        </Typography>
                        <ThemeProvider theme={theme}>
                            {error && <div className={styles.error}>{error}</div>}
                            <TextField
                                className={styles.input}
                                variant='outlined'
                                label='Email*'
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                            ></TextField>
                            {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

                            <TextField
                                className={styles.input}
                                variant='outlined'
                                label='Password*'
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                            ></TextField>
                            {errors.password && touched.password && <div className={styles.error}>{errors.password}</div>}

                            <FormControlLabel className={styles.input}
                                              control={<Checkbox checked={rememberMe} onChange={handleRememberMe} />}
                                              label='Remember me'/>
                        </ThemeProvider>
                        <Button sx={{mt: 2}} color="error" variant='contained' type='submit'  disabled={isSubmitting}>
                            Sign in
                        </Button>
                    </Paper>
                </form>
            )}
        </Formik>
    )
};

export default Login;






