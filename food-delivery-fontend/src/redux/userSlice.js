import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../services";

export const getUsers = createAsyncThunk("user/get", async () => {
  const users = await userServices.getUsers();
  return users;
});

export const getUserByUsername = createAsyncThunk(
  "user/get/byusername",
  async (username) => {
    const response = userServices.getUserByUsername(username);
    return response;
  }
);

export const updateUserInfo = createAsyncThunk("user/update", async (user) => {
  const response = await userServices.updateUserInfo(user);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    singleUser: null,
    isRefresh: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload.users;
        state.refreshStatus = false;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.singleUser = action.payload.data;
        console.log("Get user successful", state.singleUser);
        state.isRefresh = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (action.payload.rowAffected === 1) {
          state.singleUser = action.payload.user;

          console.log("Update info successful!");
          state.isRefresh = true;
        }
      });
  },
});

export default userSlice;
