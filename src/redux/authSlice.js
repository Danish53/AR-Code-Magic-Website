// import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");

// const initialState = {
//   user: token ? JSON.parse(localStorage.getItem("user")) : null,
//   token: token || null,
//   isAuthenticated: !!token,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signupSuccess: (state) => {
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//     },
//     authFail: (state, action) => {
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { signupSuccess, loginSuccess, authFail, logout } = authSlice.actions;
// export default authSlice.reducer;
