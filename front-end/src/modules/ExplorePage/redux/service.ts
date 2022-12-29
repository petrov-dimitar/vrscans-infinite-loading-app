import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const vrScansApi = createApi({
  reducerPath: 'vrscans',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getVrScansWithFilters: builder.query<
      any,
      { limit?: number; skip?: number; materials?: number[]; colors?: number[]; tags?: number[] }
    >({
      query: (arg) => {
        const { limit, skip, materials, colors, tags } = arg;
        console.log('arg: ', arg);
        return {
          url: `vrscans?${colors?.length ? 'colors=[' + colors + ']&' : ''}${
            tags?.length ? 'tags=[' + tags + ']&' : ''
          }${materials?.length ? 'materials=[' + materials + ']&' : ''} ${
            skip !== undefined ? 'skip=' + skip + '&' : ''
          }${limit ? 'limit=' + limit + '&' : ''}`
          // params: { limit, skip, materials, colors, tags }
        };
      }
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVrScansWithFiltersQuery } = vrScansApi;
