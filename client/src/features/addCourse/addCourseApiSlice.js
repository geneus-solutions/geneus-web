import { apiSlice } from "../../app/api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (course) => ({
        url: '', // add the url
        method: 'POST',
        body: course,
      }),
    }),
  }),
});

export const { useAddCourseMutation } = courseApi;
