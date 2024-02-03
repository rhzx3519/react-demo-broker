import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state = initialState
        },
    }
})

// Action creators are generated for each case reducer function
export const { login, logout} = userSlice.actions

export default userSlice.reducer