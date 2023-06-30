import axios from "axios";
import {deletePost} from "./redux/postSlice";


export const backend = axios.create({
    baseURL: "http://localhost:4000"
});

backend.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})


export const getTags = async () => {
    try {
        const {data} = await backend.get("/posts/tags")
        return data
    } catch (err) {
        console.log(err)
    }
}

export const likePost = async (postId, setLike) => {
    try {
        const { data } = await backend.put(`/posts/${postId}/like`)
        setLike(data.likesCount)
    } catch (error) {
        console.error(error)
    }
};

export const removePost = async (postId, dispatch) => {
    try {
        await backend.delete(`/posts/${postId}`)
        dispatch(deletePost(postId))
    } catch (error) {
        console.log(error)
    }
};

export const handleIntersection = async (postId) => {
    try {
        await backend.put(`/posts/${postId}`)
        console.log(`Counter ${postId} ++`)
    } catch (err) {
        console.log(err)
    }
}


export const postAuth = async (params) => {
    try {
        const {data} = await backend.post('/login', params)
        return data
    } catch (error) {
        throw error
    }
}

export const loginAuth = async () => {
    try {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return null;
        }
        const { data } = await backend.get('/me')
        return data
    } catch (error) {
        console.log(error.response)
        throw error
    }
}

export const register = async (params) => {
    try {
        const {data} = await backend.post('/register', params)
        return data
    } catch (error) {
        console.log(error)
    }
}













