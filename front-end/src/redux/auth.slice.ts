/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.service';
import { RootState } from './store';
import { createSelector } from 'reselect';

interface User {
  email: string;
  password: string;
  photo: string;
  favorites: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ data: any; accessToken: string | null }>) => {
      const { payload } = action;
      state.token = payload.accessToken;
      state.user = payload.data.currentUser;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getUserByToken.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        const user = action.payload.data.currentUser;
        if (user) {
          state.user = user;
        }
      }
    );
  }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectedUser = (state: RootState) => state.auth.user;

export const selectUser = createSelector([selectedUser], (state) => state);
