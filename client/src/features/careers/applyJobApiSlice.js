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

const paidjobApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
     postpaidjob: builder.mutation({
      query: (data) => ({
        url: "/createOpportunity",
        method: "POST",
        body: data,
      }),
        invalidatesTags: ['Opportunities']
     }),
     
     // GET - Get all opportunities
     getopportunities: builder.query({
       query: () => "/getopportunity", 
       providesTags: ['Opportunities']
     })
   })
     })
  

export const { useApplyJobMutation } = contactUsApiSlice;
export const { usePostpaidjobMutation, useGetopportunitiesQuery } = paidjobApiSlice;