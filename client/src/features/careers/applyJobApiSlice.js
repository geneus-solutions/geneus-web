import { apiSlice } from "../../app/api/apiSlice";

const contactUsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply-job", // pase original backend link
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useApplyJobMutation } = contactUsApiSlice;