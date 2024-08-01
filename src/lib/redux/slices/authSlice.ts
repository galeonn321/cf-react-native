import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<{ isAuthenticated: boolean }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
