import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
    // builder object has its own methods, like .query()
    endpoints: (builder) => ({
        // POST is a mutation
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        // server logout
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
                method: 'GET',
            }),
            // doesn't require refresh to see users after deletion
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// convention: 'use' + nameOfQuery + 'Query'/'Mutation'
export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = usersApiSlice;