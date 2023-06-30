import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.data = action.payload
        },
        setAuth: (state, action) => {
            state.data = action.payload
        },
        setRegister: (state, action) => {
            state.data = action.payload
        },
        logout: (state) => {
            state.data = null
        },
    },
})

export const {setLogin, setAuth, setRegister, logout} = userSlice.actions
export const selectIsAuth = state => Boolean(state.user.data)

export const userReducer =  userSlice.reducer