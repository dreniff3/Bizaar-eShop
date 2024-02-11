import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
    // builder object has its own methods, like .query()
    endpoints: (builder) => ({
        // POST is a mutation
        login: builder.mutation({
            query: (data) => ({
                url: USERS_URL/login,
                method: 'POST',
                body: data,
            }),
            // in seconds
            keepUnusedDataFor: 5,
        }),
    }),
});

// convention: 'use' + nameOfQuery + 'Query'
export const { useLoginMutation } = usersApiSlice;