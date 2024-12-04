import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getFoodItems: builder.query({
            query: () => ({
                url: '/getFoodItems',
                method: 'GET',
            }),
        }),
        getFood: builder.query({
            query: () => ({
                url: '/food',
                method: 'GET',
            }),
        }),
        addFood: builder.mutation({
            query: (body) => ({
                url: '/api/addFood',
                method: 'POST',
                body,
            }),
        }),
        deleteFood: builder.mutation({
            query: (id) => ({
                url: `/food/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetFoodItemsQuery,useGetFoodQuery, useAddFoodMutation, useDeleteFoodMutation } = foodApiSlice;