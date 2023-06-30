import React, {useState} from 'react';
import styles from './AddComment.module.scss'
import {Avatar, Button, InputAdornment, TextField, ThemeProvider} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {createTheme} from "@mui/material/styles";
import {backend} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../redux/postSlice";

const theme = createTheme({
    typography: {
        fontSize: 16,
    },
    palette: {
        primary: {
            main: '#000',
            contrastText: '#000',
        },
        focus: {
            main: '#000',
        },
    },
});

const AddComment = ({postId}) => {

    const [commentValue, setCommentValue] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.data)

    const onSubmit = async (postId) => {
        try {
            const payload = {
                text: commentValue,
                userId: user._id,
                fullName: user.fullName,
                avatar: user.avatar,
            }

            const { data } = await backend.post(`/posts/${postId}/comments`, payload)
            console.log(data)
            dispatch(addComment({postId, comment: data.comment}))

            setCommentValue('')
        } catch (error) {
            console.log(error);
            alert('Failed to add comment')
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <ThemeProvider theme={theme}>
                    <TextField
                        className={styles.addComment}
                        value={commentValue}
                        onChange={e => setCommentValue(e.target.value)}
                        placeholder="Add comment..."
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <Avatar src={`http://localhost:4000${user.avatar}`} sx={{mr: 1}}/>
                            </InputAdornment>,
                            classes: {
                                root: styles.textFieldRoot
                            },
                            endAdornment: <InputAdornment position="end">
                                <Button color="inherit" onClick={() => onSubmit(postId)}>
                                    <SendIcon/>
                                </Button>
                            </InputAdornment>,
                        }}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default AddComment;