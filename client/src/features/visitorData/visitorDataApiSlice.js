import { apiSlice } from "../../app/api/apiSlice";

export const visitorDataApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Visitor'],
    endpoints: (builder) => ({
        visitorData: builder.query({
            query: ({dateFrom, dateTo}) => {
                return {
                url: `/getvisitor/${dateFrom}/${dateTo}`,
                method: 'GET',
            }},
            providesTags: (result, error, { dateFrom, dateTo }) => 
                result ? [{ type: 'Visitor', id: `${dateFrom}-${dateTo}` }] : [],
        }),
        deleteVisitorData: builder.mutation({
            query: ({dateFrom, dateTo}) => {
                return {
                url: `/deletevisitor/${dateFrom}/${dateTo}`,
                method: 'DELETE',
            }},
            invalidatesTags:  
                [{type: 'Visitor'}],
        }),
        deleteVisitorDataById: builder.mutation({
            query: ({id}) => ({
                url: `/deletevisitorbyid/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags:  
            [{type: 'Visitor'}],
        })
    }),
});

export const { useVisitorDataQuery, useDeleteVisitorDataMutation, useDeleteVisitorDataByIdMutation } = visitorDataApiSlice;