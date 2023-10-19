import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const restaurantSignIn = createAsyncThunk("restaurantSignIn", async ({ restaurantFormData, cb }) => {
  try {
    // try to login here and send payload to restaurantSlice for further use.
    const API_URI = `${process.env.REACT_APP_BASE_URI}/restaurant/signin`;

    const res = await axios.post(API_URI, restaurantFormData);

    // set the local storage
    if (res.status === 200) {
      localStorage.setItem("restaurant-token", res.data.data.token);
    }

    cb?.(res);
    return res.data.data.token;

  } catch (err) {
    cb?.(err.response);
    console.error(err.code);
  }
});

// create a restaurant signup action
const restaurantSignUp = createAsyncThunk("restaurantSignUp", async ({ restaurantFormData, cb }) => {
  try {
    // try to sign up here and send payload to restaurantSlice for further use.
    const API_URI = `${process.env.REACT_APP_BASE_URI}/restaurant/create-restaurant`;

    const res = await axios.post(API_URI, restaurantFormData);

    cb?.(res);
    return res.data.data.restaurant;

  } catch (err) {
    cb?.(err.response);
    console.error(err.code);
  }
});

export { restaurantSignUp, restaurantSignIn };