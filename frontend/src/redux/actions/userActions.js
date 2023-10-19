import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create a user action
const userSignIn = createAsyncThunk("userSignIn", async ({ userDetails, cb }) => {
  try {
    // try to login here and send payload to userslice for further use.
    const API_URI = `${process.env.REACT_APP_BASE_URI}/user/signin`;

    const res = await axios.post(API_URI, userDetails);

    // set the local storage
    if (res.status === 200) {
      localStorage.setItem("user-token", res.data.data.token);
    }

    cb?.(res);
    return res.data.data.token;

  } catch (err) {
    cb?.(err.response);
    console.error(err.code);
  }
});

const userSignUp = createAsyncThunk("userSignUp", async ({ formdata, cb }) => {
  try {
    // try to login here and send payload to userslice for further use.
    const API_URI = `${process.env.REACT_APP_BASE_URI}/user/signup`;

    const res = await axios.post(API_URI, formdata);

    cb?.(res);
    return res.data.data.user;

  } catch (err) {
    cb?.(err.response);
    console.error(err.code);
  }
});

export { userSignIn, userSignUp };

// old redux code

// const userSignInn = createAsyncThunk({
//   "userSignIn", async({ userDetails ,cb}=)

//   // create payload Creator
//   // async (payload) => {
//   //   // try to login here and send payload to userSlice for further use.
//   //   const API_URI = `${process.env.REACT_APP_BASE_URI}/user/signin`;

//   //   try {
//   //     const res = await axios.post(API_URI, payload);

//   //     // after successful login user token will be saved to local-storage
//   //     if (res.status === 200) {
//   //       localStorage.setItem("user-token", res.data.data.token);
//   //     }

//   //     // return this response payload
//   //     return res.data.data.token;

//   //   } catch (error) {
//   //     // if any error
//   //     console.log(error.code);
//   //   }
//   // }
// });

// export const signUp = createAsyncThunk(
//   "signup",

//   // create payload Creator
//   async (payload) => {
//     // try to login here and send payload to userSlice for further use.
//     const API_URI = `${process.env.REACT_APP_BASE_URI}/user/signup`;

//     try {
//       const res = await axios.post(API_URI, payload);

//       // return this response payload
//       return res.data.data.user;

//     } catch (error) {
//       // if any error
//       console.log(error.code);
//     }
//   }
// );
