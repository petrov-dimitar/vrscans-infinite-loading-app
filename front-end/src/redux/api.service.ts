import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const apiService = createApi({
  reducerPath: 'api',
  tagTypes: ['FAVORITES', 'USER'],
  baseQuery,
  endpoints: () => ({})
});

export default apiService;
