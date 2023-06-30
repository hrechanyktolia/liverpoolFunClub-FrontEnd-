import React from 'react';
import {Avatar} from "@mui/material";

import styles from './UserInfo.module.css';



const UserInfo = ({ avatar, fullName, createdAt }) => {

    const getTimeAgo = () => {
        const postDate = new Date(createdAt)
        const currentDate = new Date()

        const timeDiff = currentDate - postDate

        const seconds = Math.floor(timeDiff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)

        switch (true) {
            case years > 0:
                return years + " years ago"
            case months > 0:
                return months + " moths ago"
            case days > 0:
                return days + " days ago"
            case hours > 0:
                return hours + " hours ago"
            case minutes > 0:
                return minutes + " minutes ago"
            default:
                return seconds + " seconds ago"
        }
    };

    return (
        <div className={styles.wrapper}>
            <Avatar alt="" src={`http://localhost:4000${avatar}`} sx={{ width: 50, height: 50 }} />
            <div className={styles.info}>
                <span className={styles.name}>{fullName}</span>
                <span className={styles.date}>{getTimeAgo()}</span>
            </div>
        </div>
    );
};

export default UserInfo;