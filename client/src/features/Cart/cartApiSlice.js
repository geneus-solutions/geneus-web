import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        cart: builder.query({
            query: (params) => {
                return {
                url: `/cart?user_id=${params}`,
                method: 'GET',
            }},
            providesTags: (result, error, id) => [{ type: 'cart', id }],
        }),
        addToCart: builder.mutation({
            query: (body) => ({
                url: '/addtocart',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, body) => [{ type: 'cart', id: body.id }],
        }),
        deleteCart: builder.mutation({
            query: (body) => {
                console.log("body", body)
                return {
                    url: `/cartdelete?user_id=${body?.user_id}&course_id=${body?.course_id}`,
                    method: 'DELETE',
                    body,
                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'cart', id: body.id }],
        }),
    }),
});

export const {useAddToCartMutation,useDeleteCartMutation,useCartQuery } = foodApiSlice;