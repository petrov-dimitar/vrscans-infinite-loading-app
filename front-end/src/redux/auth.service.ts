import apiService from './api.service';

// Define a service using a base URL and expected endpoints
export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['USER']
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials
      })
    }),
    getUserByToken: builder.query({
      query: () => ({
        url: '/user_by_token',
        method: 'GET'
      }),
      providesTags: ['USER']
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useGetUserByTokenQuery } = authApi;
