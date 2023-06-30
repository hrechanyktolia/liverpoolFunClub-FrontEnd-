import React from 'react';
import {Link} from "react-router-dom";

import {IconButton, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import styles from './CreateNewPost.module.scss';


const CreatePostBlock = () => {
    return (
        <Paper classes={{root: styles.root}}>
            <Link to="/create-post">
                <IconButton classes={{root: styles.icon}} size="large">
                    <AddIcon fontSize="inherit" sx={{color: '#000'}}/>
                </IconButton>
            </Link>
            <Typography variant='h5' conponent='h5'>
                Create new post
            </Typography>

        </Paper>
    );
};

export default CreatePostBlock;