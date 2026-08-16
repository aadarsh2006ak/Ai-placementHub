import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  credentials: 'include', // Crucial: enables sending httpOnly auth cookies
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // Auto logout on token expiration / unauthorized
    api.dispatch(logout());
  }
  return result;
};

/**
 * Base API Slice for RTK Query caching and data operations.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Job', 'Application', 'Stats', 'Company', 'Student'],
  endpoints: () => ({}),
});