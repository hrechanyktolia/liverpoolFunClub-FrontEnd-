import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from "./Header.module.css"
import TemporaryDrawer from "../sidebar/Sidebar";
import {logout} from "../../redux/userSlice";

import {Avatar, Button, Container, IconButton, Typography} from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';




const Header = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)

    const isAuth = Boolean(user)

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div className={styles.root}>
            <Container maxWidth='false' >
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 5 }}
                            onClick={toggleDrawer("left", true)}
                        >
                            <MenuIcon fontSize="large"/>
                        </IconButton>
                        <Link to="/">
                            <img width={70} height={70} src="https://drive.google.com/uc?id=1JvsQxzAlkTNqCbL3UwErA12bb-CB-DX3" alt="logo LFC"/>
                        </Link>
                        <Typography component='span' variant='h4' sx={{ml: 2}} >
                            Liverpool Fun Club
                        </Typography>
                    </div>
                    <div>
                        {isAuth ?
                            <div style={{display: "flex", alignItems: 'center', marginTop: '10px'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginRight: "3rem"}}>
                                    <Avatar src={`http://localhost:4000${user.avatar}`} sx={{mr: 1, width: '50px', height: '50px'}}/>
                                    <span style={{fontSize: "20px"}}>{user.fullName}</span>
                                </div>
                                <Link to='/login'>
                                    <Button onClick={handleLogout} sx={{color: '#000'}} >
                                        <LogoutIcon sx={{mr: 1}}/>
                                        Log out
                                    </Button>
                                </Link>
                            </div>
                            :
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                                <Link to="/login">
                                    <Button sx={{mr: 5, color: '#000'}}>
                                        <LoginIcon sx={{mr: 1}}/>
                                        Sing in
                                    </Button>
                                </Link>
                                <Link to="/registration">
                                    <Button sx={{color: '#000'}} >
                                        <PersonOutlineOutlinedIcon sx={{mr: 1}}/>
                                        Sing up
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </Container>
            <TemporaryDrawer state={state} toggleDrawer={toggleDrawer}/>
        </div>
    );
}

export default Header;