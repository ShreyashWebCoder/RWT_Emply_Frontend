// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   isAuthenticated: !!localStorage.getItem("user"),
//   loading: false,
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true
//     },
//     loginSuccess: (state, action) => {
//       state.user = action.payload
//       state.isAuthenticated = true
//       state.loading = false
//       localStorage.setItem("user", JSON.stringify(action.payload))
//     },
//     loginFailure: (state) => {
//       state.loading = false
//     },
//     logout: (state) => {
//       state.user = null
//       state.isAuthenticated = false
//       localStorage.removeItem("user")
//     },
//   },
// })

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
// export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        profilePic: action.payload.profilePic,
        role: action.payload.role,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
