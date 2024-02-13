import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";

/**   
 * Redux "store" is a container that holds the 
 * application's global state.
 * 
 * Reducer functions generate initial state / 
 * calculate future updates. They are run using the
 * react-redux method useDispatch() -- see: 
 * CartPage, LoginPage, ProductPage, RegisterPage.
 * 
 * Data-flow: 1. actions are DISPATCHED in response 
 *               to user interaction
 *            2. the store runs REDUCER function to
 *               calculate a new state
 *            3. UI reads new state to display
 */
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;