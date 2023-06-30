import React, {useEffect} from 'react';
import {Grid, Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {setPosts, setSortBy, setTags} from "../redux/postSlice";
import {backend, getTags} from '../api.js';
import TagsBlock from "../components/tagsBlock/TagsBlock";
import Post from "../components/post/Post";
import CreatePostBlock from "../components/createPostBlock/CreatePostBlock";


const Home = () => {

    const dispatch = useDispatch();
    const { posts, tags, sortBy } = useSelector(state => state.posts);
    const userData = useSelector(state => state.user.data)

    const uniqTags = tags
        .map(tag => tag.trim())
        .filter((value, index, self) => self.indexOf(value) === index)

    const getPosts = async () => {
        let url = ""

        if (sortBy === 'date') {
            url = "/posts"
        } else if (sortBy === 'popular') {
            url = "/posts/popular"
        }

        try {
            const { data } = await backend.get(url);
            return data
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const fetchData = async () => {

            const postsData = await getPosts();
            const tagsData = await getTags();

            dispatch(setPosts(postsData));
            dispatch(setTags(tagsData));
        }

        fetchData();
    }, [sortBy]);

    const handleSortByChange = (event, newValue) => {
        dispatch(setSortBy(newValue));
    };

    return (
        <>
            <Tabs
                value={sortBy}
                onChange={handleSortByChange}
                aria-label="basic tabs example"
                sx={{
                    '& .Mui-selected': {
                        color: 'red !important',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'red !important',
                    },
                }}
            >
                <Tab label="New" value="date" sx={{ fontSize: 16 }} />
                <Tab label="Popular" value="popular" sx={{ fontSize: 16 }} />
            </Tabs>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    {posts !== undefined && posts.map(obj => (
                        <Post
                            key={obj._id}
                            {...obj}
                            isOwner={userData && obj.user && userData._id === obj.user._id}
                            imageUrl={obj.imageUrl && `http://localhost:4000${obj.imageUrl}`}
                        />
                    ))}
                </Grid>
                <Grid item xs={4}>
                    {userData && <CreatePostBlock />}
                    <TagsBlock tags={uniqTags} />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;