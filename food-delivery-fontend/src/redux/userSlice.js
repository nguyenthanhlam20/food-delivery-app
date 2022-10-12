import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../services";

export const getUsers = createAsyncThunk("user/get", async () => {
  const users = await userServices.getUsers();
  return users;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.refreshStatus = false;
    });
  },
});

export default userSlice;
