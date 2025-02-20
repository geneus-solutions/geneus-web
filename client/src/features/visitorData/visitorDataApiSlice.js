import { apiSlice } from "../../app/api/apiSlice";

export const visitorDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        visitorData: builder.query({
            query: ({date}) => {
                return {
                url: `/getvisitor/${date}`,
                method: 'GET',
            }},
        })
    }),
});

export const { useVisitorDataQuery } = visitorDataApiSlice;