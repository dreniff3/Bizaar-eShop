import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;