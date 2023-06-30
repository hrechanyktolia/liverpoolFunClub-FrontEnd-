import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import styles from './Post.module.scss'
import UserInfo from "../userInfo/UserInfo";
import CommentsBlock from "../CommentsBlock";
import AddComment from "../addComment/AddComment";
import {handleIntersection, likePost, removePost} from "../../api";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClearIcon from '@mui/icons-material/Clear';



const Post = ({ _id, text, imageUrl, user, createdAt, viewsCount, likesCount, comments, tags,  isOwner}) => {

    const [fullText, setFullText] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [addComment, setAddComment] = useState(false)
    const [isViewed, setIsViewed] = useState(false)
    const [like, setLike] = useState(likesCount)

    const postElement = useRef(null)
    const observer = useRef(null)

    const dispatch = useDispatch()

    const tagsWithoutSpace = tags.map(tag => tag.trim())

    const showFullText = () => setFullText(!fullText)

    const handleComment = () => {
        if (comments.length > 0) {
            setIsCommenting(!isCommenting)
        }
    }

    const handleAddComment = () => setAddComment(!addComment)


    const handleLike = async (postId) => {
        await likePost(postId, setLike);
    };

    const onClickRemove = async (postId) => {
        if (window.confirm('Do you really want to delete the post')) {
            await removePost(postId, dispatch);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const handleObserver = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isViewed) {
                    const postId = entry.target.getAttribute("data-postid");
                    const viewedKey = `viewed-${postId}`;
                    const isViewed = localStorage.getItem(viewedKey);
                    if (!isViewed) {
                        handleIntersection(postId);
                        setIsViewed(true);
                        localStorage.setItem(viewedKey, "true");
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(handleObserver, options);
        observer.current.observe(postElement.current);

        return () => {
            observer.current.disconnect();
        };
    }, [isViewed]);

    return (
        <div className={styles.wrapper} data-postid={_id} ref={postElement}>
            <div className={styles.head}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <UserInfo {...user} createdAt={createdAt}/>
                    {isOwner && <ClearIcon onClick={() => onClickRemove(_id)}  className={styles.deletePost}/>}
                </div>
                <p className={styles.text}>
                    {fullText ? text : text.slice(0, 250)}
                    {(text.length > 250 && !fullText) &&
                        <span className={styles.readMore} onClick={showFullText}>
                            ...show more
                        </span>
                    }
                </p>
            </div>
            {imageUrl && <img className={styles.image}  src={imageUrl} alt="post"/>}
            <ul className={styles.tags}>
                {tagsWithoutSpace.map((name, index) => (
                    name && (
                        <li key={index}>
                            <Link to={`/tags/${name}`}>
                                #{name}
                            </Link>
                        </li>
                    )
                ))}
            </ul>
            <div className={styles.postDetail}>
                <ul className={styles.blockLeft}>
                    <li>
                        <FavoriteBorderIcon onClick={() => handleLike(_id)}/>
                        <span>{like}</span>
                    </li>
                    <li onClick={handleAddComment}>
                        <CommentIcon />
                        <span>Comment...</span>
                    </li>
                </ul>
                <ul className={styles.blockRight}>
                    <li onClick={handleComment}>
                        {comments.length > 0 ? comments.length : ''}
                        <span>comments</span>
                    </li>
                    <li>
                        <RemoveRedEyeIcon/>
                        {viewsCount > 0 && <span>{viewsCount}</span>}

                    </li>
                </ul>
            </div>
            {addComment && <AddComment postId={_id}/>}
            {isCommenting && <CommentsBlock postId={_id}/>}
        </div>
    );
};

export default Post;