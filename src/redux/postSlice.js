import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    tags: [],
    sortBy: 'date',
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find((p) => p._id === postId);
            if (post) {
                post.comments.push(comment);
            }
        },
        setSortBy: (state, action) => {
          state.sortBy = action.payload
        },
        deletePost: (state, action) => {
            const deletedPostId = action.payload;
            const deletedPost = state.posts.find(obj => obj._id === deletedPostId);

            if (deletedPost) {
                state.posts = state.posts.filter(obj => obj._id !== deletedPostId);
                state.tags = state.tags.filter(tag => !deletedPost.tags.includes(tag));
            }
        },
        setTags: (state, action) => {
            state.tags = action.payload
        },
    }
})

export const {setPosts, addComment, setSortBy, deletePost, setTags} = postSlice.actions

export const postReducer =  postSlice.reducer