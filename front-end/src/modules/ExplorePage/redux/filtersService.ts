import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const filtersApi = createApi({
  reducerPath: 'filtersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getColorsFilters: builder.query({
      query: () => {
        return {
          url: 'colors'
        };
      }
    }),
    getMaterialsFilters: builder.query({
      query: () => {
        return {
          url: 'materials'
        };
      }
    }),
    getTagsFilters: builder.query({
      query: () => {
        return {
          url: 'tags'
        };
      }
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetColorsFiltersQuery, useGetTagsFiltersQuery, useGetMaterialsFiltersQuery } =
  filtersApi;
