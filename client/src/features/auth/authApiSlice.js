import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: {...credentials},
            }),
            keepUnusedDataFor: 5,
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: 'DELETE',
            })
        })
    }),
});

export const { useLoginMutation,useSignupMutation, useLogoutMutation, useDeleteUserMutation } = authApiSlice;