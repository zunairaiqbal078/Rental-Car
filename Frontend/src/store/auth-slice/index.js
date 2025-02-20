import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {}, // Use empty object if user is null
  token: sessionStorage.getItem("token"),
  isAuthenticated: !!sessionStorage.getItem("user"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      // Persist in session storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.token = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
