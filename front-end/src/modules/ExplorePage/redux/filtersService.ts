import apiService from 'redux/api.service';

// Define a service using a base URL and expected endpoints
export const filtersApi = apiService.injectEndpoints({
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
