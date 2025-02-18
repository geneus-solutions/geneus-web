import { apiSlice } from "../../app/api/apiSlice";

export const visitorDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        visitorData: builder.query({
            query: () => {
                return {
                url: `/getvisitor`,
                method: 'GET',
            }},
        })
    }),
});

export const { useVisitorDataQuery } = visitorDataApiSlice;