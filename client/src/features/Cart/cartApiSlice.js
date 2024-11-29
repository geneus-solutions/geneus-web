import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        cart: builder.query({
            query: (params) => {
                console.log('params : ',params);
                return {
                url: `/cart?user_id=${params}`,
                method: 'GET',
            }
            },
        }),
        addToCart: builder.mutation({
            query: (body) => ({
                url: '/addtocart',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useAddToCartMutation,useCartQuery } = foodApiSlice;