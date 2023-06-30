import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AddPost.module.scss'
import {backend} from "../../api";

import {Button, Paper, TextField, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";



const theme = createTheme({
    typography: {
        fontSize: 20,
    },
    palette: {
        primary: {
            main: '#f44336',
            contrastText: '#000',
        },
        focus: {
            main: '#f44336',
        },
    },
});

const AddPost = () => {

    const [fields, setFields] = useState({text: '', tags: '', imageUrl: ''})
    const {text, tags, imageUrl} = fields

    const inputRef = useRef(null)
    const navigate = useNavigate()

    const handleChangeFile =  async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            const {data} = await backend.post('/upload', formData)
            setFields({...fields, imageUrl: data.url})
        } catch (error) {
            console.log(error)
            alert('Failed to load image')
        }
    }

    const onSubmit = async () => {
        try {
            const {data} = await backend.post('/posts', fields)
            if (data) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            alert('Failed to submit post')
        }
    }

    const onClickRemoveImage = () => {
       if (window.confirm('Delete image?')) {
           setFields({...fields, imageUrl: ''})
       }
    }

    return (
        <Paper style={{ padding: 30 }}>
            <Button onClick={() => inputRef.current.click()} variant="outlined" size="large" color="error">
                Download
            </Button>
            <input ref={inputRef} type="file" onChange={handleChangeFile} hidden accept="image/*" />
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage} sx={{marginLeft: '10px'}}>
                        Delete
                    </Button>
                    <img className={styles.image} src={`http://localhost:4000${imageUrl}`} alt="Uploaded" />
                </>
            )}
            <br/>
            <br/>
            <ThemeProvider theme={theme}>
                <TextField label="Share your thoughts reds..."
                           value={text}
                           onChange={e => setFields({...fields, text: e.target.value})}
                           multiline rows={15}
                           fullWidth />
                <TextField classes={{ root: styles.tags }}
                           value={tags}
                           onChange={e => setFields({...fields, tags: e.target.value})}
                           variant="standard"
                           placeholder="Tags"
                           fullWidth  />
            </ThemeProvider>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained" color="success">
                    Public
                </Button>
                <a href="/">
                    <Button size="large" color="error">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};

export default AddPost;