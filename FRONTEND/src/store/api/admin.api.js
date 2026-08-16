import { apiSlice } from '../slices/apiSlice';

/**
 * Administration control panel API endpoints injected into the base apiSlice.
 */
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/admins/dashboard-stats',
      providesTags: ['Stats'],
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/admins/users',
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admins/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Stats', 'Job', 'Application'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = adminApi;
