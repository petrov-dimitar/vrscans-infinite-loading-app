/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
