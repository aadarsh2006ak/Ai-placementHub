import { apiSlice } from '../slices/apiSlice';

/**
 * Student-specific API endpoints injected into the base apiSlice.
 */
export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentProfile: builder.query({
      query: () => '/students/profile',
      providesTags: ['Student'],
    }),
    updateStudentProfile: builder.mutation({
      query: (profileData) => ({
        url: '/students/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Student', 'User'],
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: '/students/upload-resume',
        method: 'POST',
        body: formData,
        // RTK Query detects FormData and sets appropriate headers (multipart/form-data) automatically
      }),
      invalidatesTags: ['Student', 'User'],
    }),
  }),
});

export const {
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
  useUploadResumeMutation,
} = studentApi;
