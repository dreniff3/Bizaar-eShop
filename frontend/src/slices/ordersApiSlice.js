import { apiSlice } from './apiSlice.js';
import { ORDERS_URL, PAYPALL_URL } from '../constants.js';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, // 5 seconds
        }),
        payOrder: builder.mutation({
            query: (orderId, details) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;