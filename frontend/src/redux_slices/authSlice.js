import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_VAR, USER_VAR } from "../constants";

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLoggedIn: sessionStorage.getItem(LOGIN_VAR) === "true" ? true : false,
    user: sessionStorage.getItem(USER_VAR) ? JSON.parse(sessionStorage.getItem(USER_VAR)) : null,
  },
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      sessionStorage.setItem(LOGIN_VAR, "true");
      sessionStorage.setItem(USER_VAR, JSON.stringify(state.user));
    },
    
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      sessionStorage.setItem(LOGIN_VAR, "false");
      sessionStorage.setItem(USER_VAR, null);
    },
  }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;