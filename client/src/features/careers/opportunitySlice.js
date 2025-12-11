import { apiSlice } from "../../app/api/apiSlice";

const paidjobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postpaidjob: builder.mutation({
      query: (data) => ({
        url: "/createOpportunity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Opportunities"],
    }),

   
   getopportunities: builder.query({
      query: () => ({
        url: '/getOpportunity?visibility=public', 
      }),
      providesTags: ['Opportunities'],
    }),
  }),

});


export const { usePostpaidjobMutation, useGetopportunitiesQuery } = paidjobApiSlice;
