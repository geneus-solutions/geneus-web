import { apiSlice } from "../../app/api/apiSlice";

export const PaymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentHistory: builder.query({
            query: (user_Id) => ({
                url: `/payments/${user_Id}`,
                method: 'GET',
            }),
        }),
    }),
});
    
export const { useGetPaymentHistoryQuery } = PaymentApiSlice;