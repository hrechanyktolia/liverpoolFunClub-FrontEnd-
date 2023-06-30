import React from 'react';
import {useSelector} from "react-redux";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";


const CommentsBlock = ({postId}) => {

    const posts = useSelector((state) => state.posts.posts)
    const post = posts.find((p) => p._id === postId)

    return (
        <List>
            {post.comments.map((obj, index) =>
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={`http://localhost:4000${obj.avatar}`}  />
                        </ListItemAvatar>
                        <ListItemText
                            primary={obj.fullName}
                            secondary={obj.text}
                            primaryTypographyProps={{fontSize: '18px'}}
                            secondaryTypographyProps={{fontSize: '16px'}}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            )}
        </List>
    );
};

export default CommentsBlock;