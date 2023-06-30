import React from 'react';
import styles from './TagsBlock.module.scss'
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

const TagsBlock = ({tags}) => {

    if (tags.length === 0) {
        return null
    }
    return (
        <Paper classes={{root: styles.root}}>
            <List>
                {tags.map((name, i) => (
                    name && (
                        <ListItem key={i} disablePadding classes={{ root: styles.listItem }}>
                            <ListItemButton component={Link} to={`/tags/${name}`}>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                    )
                ))}
            </List>
        </Paper>
    );
};

export default TagsBlock;