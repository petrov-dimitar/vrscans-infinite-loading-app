import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { getJWT } from './utils/jwt.utils';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = getJWT();

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});
