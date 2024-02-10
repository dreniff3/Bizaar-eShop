import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("cart") ? 
    JSON.parse(localStorage.getItem("cart")) : 
    {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // functions for cart
    },
});

export default cartSlice.reducer;