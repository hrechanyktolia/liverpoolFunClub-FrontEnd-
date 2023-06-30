import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Post from "../components/post/Post";
import {backend} from "../api";
import {setPosts} from '../redux/postSlice';


const PostsByTag = () => {
    const { tagName } = useParams()
    const { posts } = useSelector(state => state.posts)

    const dispatch = useDispatch()

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await backend.get('/posts')
            const { data } = response
            dispatch(setPosts(data))
        } catch (error) {
            console.log(error)
        }
    };

    fetchData()
}, [])


    const filteredPosts = posts.filter(post => {
        return post.tags.some(tag => tag.trim() === tagName)
    })

    return (
        <>
            <h1> Tag name - {tagName}</h1>
            {filteredPosts !== undefined && filteredPosts.map(obj => (
                <Post
                    key={obj._id}
                    {...obj}
                    imageUrl={obj.imageUrl && `http://localhost:4000${obj.imageUrl}`}
                />
            ))}
        </>
    );
};

export default PostsByTag;


