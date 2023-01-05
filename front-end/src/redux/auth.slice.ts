/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.service';
import { RootState } from './store';
import { createSelector } from 'reselect';
import { clearJWT, setJWT } from './utils/jwt.utils';

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
    logout: (state) => {
      clearJWT();
      state.token = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    // Update user if token available on browser
    builder.addMatcher(
      authApi.endpoints.getUserByToken.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        const user = action.payload.data.currentUser;
        if (user) {
          state.user = user;
        }
      }
    );

    // Update user on successful login
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        const user = action.payload.user;
        const token = action.payload.token;

        setJWT(token);

        if (user) {
          state.user = user;
          state.token = token;
        }
      }
    );
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectedUser = (state: RootState) => state.auth.user;

export const selectUser = createSelector([selectedUser], (state) => state);
