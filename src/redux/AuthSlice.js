import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  currentTheme: "dark",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    loginFailure: (state) => {
      state.token = null;
    },
    logoutSuccess: (state) => {
      state.token = null;
    },
    toggleThemeRed: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess, toggleThemeRed } =
  authSlice.actions;
export default authSlice.reducer;
