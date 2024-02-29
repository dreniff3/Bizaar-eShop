import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    // builder object has its own methods, like .query()
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // in seconds
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            // stops data from being cached so it's always fresh
            invalidatesTags: ['Product'], 
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

// convention: 'use' + nameOfQuery + 'Query'
export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
} = productsApiSlice;