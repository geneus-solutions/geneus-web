import { apiSlice } from "../../app/api/apiSlice";

export const learningApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        myLearning: builder.query({
            query: ({user_Id}) => ({
                url: `/learning?user_id=${user_Id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useMyLearningQuery } = learningApiSlice;