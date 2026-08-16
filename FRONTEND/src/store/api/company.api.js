import { apiSlice } from '../slices/apiSlice';

/**
 * Company-specific API endpoints injected into the base apiSlice.
 */
export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyProfile: builder.query({
      query: () => '/companies/profile',
      providesTags: ['Company'],
    }),
    updateCompanyProfile: builder.mutation({
      query: (profileData) => ({
        url: '/companies/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Company', 'User'],
    }),
    uploadLogo: builder.mutation({
      query: (formData) => ({
        url: '/companies/upload-logo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Company', 'User'],
    }),
    getJobApplications: builder.query({
      query: (jobId) => `/jobs/${jobId}/applications`,
      providesTags: ['Application'],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ applicationId, status }) => ({
        url: `/jobs/applications/${applicationId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Application', 'Stats'],
    }),
  }),
});

export const {
  useGetCompanyProfileQuery,
  useUpdateCompanyProfileMutation,
  useUploadLogoMutation,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = companyApi;
