import {useEffect} from "react";
import {Routes, Route} from "react-router-dom"
import {useDispatch} from "react-redux";
import {Container} from "@mui/material";

import Header  from "./components/header/Header";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Home from "./pages/Home";
import AddPost from "./pages/addPost/AddPost";
import AboutUs from "./pages/AboutUs";
import PostsByTag from "./pages/PostsByTag";

import {loginAuth} from "./api";
import {setAuth} from "./redux/userSlice";



function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await loginAuth()
                dispatch(setAuth(userData))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    return (
    <div className='App'>
        <Header/>
        <Container sx={{mt: 2}} maxWidth='lg'>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tags/:tagName" element={<PostsByTag/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/create-post" element={<AddPost/>}/>
                <Route path="/about" element={<AboutUs/>}/>
            </Routes>
        </Container>
    </div>
    );
}

export default App;
