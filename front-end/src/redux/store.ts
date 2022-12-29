import { configureStore } from '@reduxjs/toolkit';
import { vrScansApi } from 'modules/ExplorePage/redux/vrScansService';
import filtersReducer from 'modules/ExplorePage/redux/filtersSlice';
import { filtersApi } from 'modules/ExplorePage/redux/filtersService';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [vrScansApi.reducerPath]: vrScansApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    filters: filtersReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vrScansApi.middleware, filtersApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
