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
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPALL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { 
    useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
} = ordersApiSlice;