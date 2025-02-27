import { apiSlice } from "../../app/api/apiSlice";

export const visitorDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        visitorData: builder.query({
            query: ({date}) => {
                return {
                url: `/getvisitor/${date}`,
                method: 'GET',
            }},
        }),
        deleteVisitorData: builder.mutation({
            query: ({date}) => {
                return {
                url: `/deletevisitor/${date}`,
                method: 'DELETE',
            }},
        })
    }),
});

export const { useVisitorDataQuery, useDeleteVisitorDataMutation } = visitorDataApiSlice;