import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload || [];
    },
    addUser: (state, action) => {
      if (action.payload) state.users.push(action.payload);
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsersError: (state, action) => {
      state.error = action.payload || null;
    },
    clearUsers: (state) => {
      state.users = [];
      state.error = null;
    },
  },
});

export const {
  setUsers,
  addUser,
  setUsersLoading,
  setUsersError,
  clearUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
