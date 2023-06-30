import * as React from 'react';
import styles from './Sidebar.module.css'

import {Box, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, ListSubheader} from '@mui/material';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import {Link} from "react-router-dom";


export default function TemporaryDrawer({state, toggleDrawer}) {

    const list = (anchor) => (
        <Box
            sx={{ width: 400 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader" classes={{root: styles.title}} >
                    Liverpool FC
                </ListSubheader>
            }>
                {['Posts', 'About Us'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{mt: 2}} classes={{root: styles.listItem}}>
                        <Link to={index === 0 ? '/' : '/about'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton >
                                <ListItemIcon sx={{color: '#000'}}>
                                    {index % 2 === 0 ? <WysiwygIcon /> : <ContactsOutlinedIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text} classes={{primary: styles.text}}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}