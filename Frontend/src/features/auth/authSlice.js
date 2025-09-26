import { createSlice } from "@reduxjs/toolkit";

// Token cookie me hai; redux me sirf user + flags
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || null;
      state.isAuthenticated = !!action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setAuthLoading, logout } = authSlice.actions;
export default authSlice.reducer;
