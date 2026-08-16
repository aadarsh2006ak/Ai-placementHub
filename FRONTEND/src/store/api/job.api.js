import { apiSlice } from '../slices/apiSlice';

/**
 * Job Board and Application API endpoints injected into the base apiSlice.
 */
export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: '/jobs',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.jobs
          ? [...result.jobs.map(({ _id }) => ({ type: 'Job', id: _id })), { type: 'Job', id: 'LIST' }]
          : [{ type: 'Job', id: 'LIST' }],
    }),
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
    createJob: builder.mutation({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...jobData }) => ({
        url: `/jobs/${id}`,
        method: 'PUT',
        body: jobData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }, { type: 'Job', id: 'LIST' }],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    applyJob: builder.mutation({
      query: ({ id, answers }) => ({
        url: `/jobs/${id}/apply`,
        method: 'POST',
        body: { answers },
      }),
      invalidatesTags: ['Application', { type: 'Job', id: 'LIST' }],
    }),
    getMyApplications: builder.query({
      query: () => '/jobs/my/applications',
      providesTags: ['Application'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyJobMutation,
  useGetMyApplicationsQuery,
} = jobApi;
