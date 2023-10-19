import { createSlice } from "@reduxjs/toolkit";
// import the user action to create reducer for login a user
import { userSignIn, userSignUp } from "../actions/userActions";


// create user slices
const userSlices = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    token: "",
    user: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    // Sign in reducers
    // 1. if state is pending or not
    builder.addCase(userSignIn.pending, (state) => {
      state.isLoading = true;
    });

    // 2. if state is error or not
    builder.addCase(userSignIn.rejected, (state) => {
      state.isError = true;
    });

    // 3. if state is resolved
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.token = action.payload;
    });

    // Sign up reducers
    // 1. if state is pending or not
    builder.addCase(userSignUp.pending, (state, action) => {
      state.isLoading = true;
    });

    // 2. if state is error or not
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.isError = true;
    });

    // 3. if state is resolved
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.user = Object.assign({}, action.payload);
    });

  }
});

// We need export the user slice
export default userSlices.reducer;