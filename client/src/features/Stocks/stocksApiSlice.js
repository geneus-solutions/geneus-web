import { apiSlice } from "../../app/api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserStock: builder.query({
            query: (userId) => ({
                url: `/user-stocks/${userId}`,
                method: 'GET'
            })
        }),
        addStocks: builder.mutation({
            query: (updatedStock) => ({
                url: "/add-stocks",
                method: 'POST',
                body: updatedStock,
            })
        }),
        updateStocks: builder.mutation({
            query: ({stock, id}) => ({
                url: `/update-stocks/${id}`,
                method: 'PUT',
                body: stock,
            })
        }),
    })

});

export const {
    useAddStocksMutation,
    useGetUserStockQuery,
    useUpdateStocksMutation
} = paymentApiSlice;