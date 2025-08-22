// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   loading: false,
//   // error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // loginStart: state => { state.loading = true; },
//     // loginSuccess: (state, action) => {
//     //   state.loading = false;
//     //   state.user = action.payload.user;
//     //   state.token = action.payload.token;
//     //   state.error = null;
//     // },
//     // loginFailure: (state, action) => {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // },
//     // logout: state => { state.user = null; state.token = null; },
//          setToken : (state, action) =>{
//             state.token = action.payload;
//             localStorage.setItem('token', action.payload);
//         },
//         setLoading : (state, action) =>{
//           // console.log("loading state : ",action);
//             state.loading = action.payload;
//             localStorage.setItem('userData', JSON.stringify(action.payload));
//         },
//         removeToken: (state, action) => {
//             state.token= null;
//             localStorage.removeItem("token")
//         },
//         initializeAuth: (state) => {
//           const token = localStorage.getItem('token');
//           const userData = localStorage.getItem('userData');
          
//           if (token && userData) {
//             state.token = token;
//             state.user = JSON.parse(userData);
//           }
//         }
//   },
// });

// // console.log('AuthSlice actions',authSlice.actions);

// export const { setToken, setLoading, removeToken,initializeAuth  } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    Logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, setLoading, Logout } = authSlice.actions;
export default authSlice.reducer;
