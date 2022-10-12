import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenServices } from "../services";

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
    user: null,
    token: null,
  },
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload.rowAffected == 1) {
        const { user, accessToken } = action.payload;
        state.user = user;
        state.token = accessToken;
      }
    });
  },
});

export default authenSlice;
