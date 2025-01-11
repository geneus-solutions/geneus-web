import { apiSlice } from "../../app/api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (course) => {
      console.log('this is course data to save', course);
        return {
          url: '/add-course', // add the url
          method: 'POST',
          body: course,
        }
      },
    }),
  }),
});

export const { useAddCourseMutation } = courseApi;
