import apiService from 'redux/api.service';

// Define a service using a base URL and expected endpoints
export const vrScansApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getVrScansWithFilters: builder.query<
      any,
      { limit?: number; skip?: number; materials?: number[]; colors?: number[]; tags?: number[] }
    >({
      query: (arg) => {
        const { limit, skip, materials, colors, tags } = arg;
        return {
          url: `vrscans?${colors?.length ? 'colors=[' + colors + ']&' : ''}${
            tags?.length ? 'tags=[' + tags + ']&' : ''
          }${materials?.length ? 'materials=[' + materials + ']&' : ''} ${
            skip !== undefined ? 'skip=' + skip + '&' : ''
          }${limit ? 'limit=' + limit + '&' : ''}`
          // params: { limit, skip, materials, colors, tags }
        };
      }
    }),
  getFavoritesScansForUser: builder.query({
    query: () => {
      return {
        url: `user_favorites`
      }
    }
  })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVrScansWithFiltersQuery, useGetFavoritesScansForUserQuery } = vrScansApi;
