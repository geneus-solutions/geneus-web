import { apiSlice } from "../../app/api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getKey: builder.query({
            query: () => ({
                url: `/payment/get-key`,
                method: "GET",
            }),
            // providesTags: ["User"],
        }),
        // verify payment
        verifyPayment: builder.mutation({
            query: (data) => ({
                url: `/payment/verify-payment`,
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["User"],
        }),

    }),
});



export const { useLazyGetKeyQuery,useVerifyPaymentMutation } = paymentApiSlice;