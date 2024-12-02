import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        cart: builder.query({
            query: (params) => {
                console.log('params : ',params);
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
    }),
});

export const {useAddToCartMutation,useCartQuery } = foodApiSlice;