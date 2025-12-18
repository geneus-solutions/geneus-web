import { apiSlice } from "../../app/api/apiSlice";

const applyJobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: ({
          data , opportunityId
        }) => ({
        url: `/apply-job/${opportunityId}`, // pase original backend link
        method: "POST",
        body: data,
      }),
    }),
  }),
});


  

export const { useApplyJobMutation } = applyJobApiSlice;
