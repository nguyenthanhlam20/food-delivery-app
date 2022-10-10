import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenServices } from "../services";
import { Redirect } from "react-router-dom";

export const signin = createAsyncThunk("user/signin", async (user) => {
  const response = await authenServices.signin(user);
  return response;
});

export const signup = createAsyncThunk("user/signup", async (user) => {
  const response = await authenServices.signup(user);
  return response;
});

const authenSlice = createSlice({
  name: "authen",
  initialState: {
    user: Object,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload.rowAffected == 1) {
        state.user = action.payload.user;
      }
    });
  },
});

export default authenSlice;
