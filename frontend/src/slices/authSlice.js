import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? 
        JSON.parse(localStorage.getItem('userInfo')) :
        null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // (state, action) => newState
        setCredentials: (state, action) => {
            // payload === the user
            state.userInfo = action.payload;
            // store user info to local storage, NOT token
            localStorage.setItem('userInfo', 
                JSON.stringify(action.payload)
            );
        },
        logout: (state, action) => {
            // local logout
            state.userInfo = null;
            localStorage.clear();
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;