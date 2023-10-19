import { createSlice } from "@reduxjs/toolkit";
// import the restaurant action to create reducer for login a restaurent admin
import { restaurantSignIn, restaurantSignUp } from "../actions/restaurantAction";

let initialState = {
  isLoading: false,
  isError: false,
  token: "",
  restaurant: {}
};

// create user slices
const restaurantSlices = createSlice({
  name: "restaurant",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 1. if state is pending or not
    builder.addCase(restaurantSignIn.pending, (state) => {
      state.isLoading = true;
    });

    // 2. if state is error or not
    builder.addCase(restaurantSignIn.rejected, (state, action) => {
      state.isError = true;
    });

    // 3. if state is resolved
    builder.addCase(restaurantSignIn.fulfilled, (state, action) => {
      // state.initialState = Object.assign({}, action.payload);
      state.token = action.payload;
    });

    // sign up reducer
    builder.addCase(restaurantSignUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(restaurantSignUp.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(restaurantSignUp.fulfilled, (state, action) => {
      state.restaurant = Object.assign({}, action.payload);
    });
  }
});


// We need export the restaurantSlices slice
export default restaurantSlices.reducer;