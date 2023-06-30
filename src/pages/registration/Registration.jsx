import React, {useRef, useState} from 'react';
import {Navigate} from "react-router-dom";
import {Formik} from "formik";

import styles from './Registration.module.css'
import {theme} from "../../components/theme";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, setRegister} from "../../redux/userSlice";
import {backend, register} from "../../api";

import {
    Avatar, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel,
    OutlinedInput, Paper, TextField, ThemeProvider, Typography} from "@mui/material";




const passwords = [{id: 'password', label: "Password*"}, {id: 'confirmPassword', label: "Confirm password*"}]



const Registration = () => {
    const [showPasswords, setShowPasswords] = useState(passwords.reduce((acc, curr) => ({...acc, [curr.id]: false}), {}))

    const inputRef = useRef(null)

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)


    const clickShowPassword = (id) => {
        setShowPasswords({...showPasswords, [id]: !showPasswords[id]})
    }

    const handleAvatar =  async (e, setFieldValue) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            const {data} = await backend.post('/upload', formData)
            setFieldValue('avatar', data.url);

        } catch (error) {
            console.log(error)
            alert('Failed to load image')
        }
    }


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const registerData = await register(values)
            dispatch(setRegister(registerData))


            if ('token' in registerData) {
                window.localStorage.setItem('token', registerData.token)
            }

            setSubmitting(false)
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseAvatar = (e, setFieldValue) => {
        setFieldValue('avatar', '')
    }


    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Formik
            initialValues={{
                avatar: '',
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                checkbox: false,

            }}
            validate={values => {
                const errors = {};
                if (!values.fullName) {
                    errors.fullName = "Required"
                } else if (values.fullName.length < 2) {
                    errors.fullName = "At least 2 characters"
                }

                if (!values.email) {
                    errors.email = "Required"
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address"
                }

                if (!values.password) {
                    errors.password = "Required"
                } else if (values.password.length < 5) {
                    errors.password = "At least 5 characters"
                }

                if (!values.confirmPassword) {
                    errors.confirmPassword = "Required"
                } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Password mismatch"
                }

                if (!values.checkbox) {
                    errors.checkbox = "Required"
                }

                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue}) => (
                <form onSubmit={handleSubmit}>
                    <Paper classes={{root: styles.root}}>
                        <Typography variant='h5' component='span' classes={{root: styles.title}}>
                            Sing up
                        </Typography>
                        <div className={styles.avatar}>
                            {values.avatar ? (
                                <div className={styles.imageContainer}>
                                    <img className={styles.img} src={`http://localhost:4000${values.avatar}`} alt="Uploaded" />
                                    <div className={styles.iconContainer}>
                                        <span className={styles.icon}
                                              onClick={e => handleCloseAvatar(e, setFieldValue)}>
                                            &times;
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <Avatar onClick={() => inputRef.current.click()} sx={{ width: 90, height: 90, cursor: 'pointer'}} />
                            )}
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAvatar(e, setFieldValue)}
                                hidden
                            />

                        </div>
                        <ThemeProvider theme={theme}>
                            <TextField className={styles.input}
                                       label='Full name*'
                                       name='fullName'
                                       onChange={handleChange}
                                       value={values.fullName}
                            ></TextField>
                            {errors.fullName && touched.fullName && <div className={styles.error}>{errors.fullName}</div>}

                            <TextField className={styles.input}
                                       label='Email*'
                                       name='email'
                                       onChange={handleChange}
                                       value={values.email}
                            ></TextField>
                            {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

                            {passwords.map(pass =>
                                <FormControl key={pass.id} classes={{root: styles.input}} variant="outlined">
                                    <InputLabel htmlFor={pass.id}>{pass.label}</InputLabel>
                                    <OutlinedInput
                                        id={pass.id}
                                        type={showPasswords[pass.id] ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => clickShowPassword(pass.id)}
                                                    edge="end"
                                                >
                                                    {showPasswords[pass.id] ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label={pass.label}
                                        name={pass.id}
                                        onChange={handleChange}
                                        value={values[pass.id]}
                                    />
                                    {errors[pass.id] && touched[pass.id] && (
                                        <div className={styles.error}>{errors[pass.id]}</div>
                                    )}
                                </FormControl>
                            )}
                            <FormControlLabel  control={<Checkbox
                                name="checkbox"
                                checked={values.checkbox}
                                onChange={handleChange}
                            />} label='Privacy policy' />
                            {errors.checkbox && touched.checkbox && <div className={styles.error}>{errors.checkbox}</div>}

                        </ThemeProvider>
                        <Button sx={{mt: 2}} color="error" variant='contained' type="submit" disabled={isSubmitting}>
                            Sing up
                        </Button>
                    </Paper>
                </form>
            )}
        </Formik>
    );
};

export default Registration;