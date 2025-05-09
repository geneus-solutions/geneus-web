import { apiSlice } from "../../app/api/apiSlice";

const verifyAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayId: builder.query({
            query: () => ({
                url: `/Pay-Id`,
                method: "GET",
            }),
            // providesTags: ["User"],
        }), 
        // nutri checkout
        NutriCheckOut: builder.mutation({
            query: (data) => ({
                url: `/nutri-checkout`,
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["User"],
        }),
        // verifi nutri subscription
        verifyNutriSubscription: builder.mutation({
            query: (data) => ({
                url: `/verify-nutri-subscription`,
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["User"],
        }),
    }),
    
});

export const { useSendOTPMutation , useLazyGetPayIdQuery , useNutriCheckOutMutation , useVerifyNutriSubscriptionMutation } = verifyAccountApiSlice;