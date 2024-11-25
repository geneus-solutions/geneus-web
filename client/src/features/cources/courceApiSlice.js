import { apiSlice } from "../../app/api/apiSlice";

export const courceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cources: builder.query({
            query: () => {
                return '/courses'
            },
        }),
        cource: builder.query({
            query: (id) => {
                console.log('cource id is:',id);
                return `/courseDes/${id}`
            },
        }),
        // signup: builder.mutation({
        //     query: (body) => ({
        //         url: '/register',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // logout: builder.mutation({
        //     query: () => ({
        //         url: '/logout',
        //         method: 'POST',
        //     }),
        // }),
    }),
});

export const { useCourcesQuery,useCourceQuery } = courceApiSlice;