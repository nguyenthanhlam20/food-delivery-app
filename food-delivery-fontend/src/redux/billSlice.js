import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { billServices } from "../services";

export const getAll = createAsyncThunk("bill/get", async () => {
  const response = await billServices.getAll();
  // console.log(response);
  return response;
});

export const getByUsername = createAsyncThunk(
  "bill/get/by/username",
  async (username) => {
    // console.log(billId);
    const response = await billServices.getByUsername(username);
    return response;
  }
);

export const insertBill = createAsyncThunk("bill/insert", async (bill) => {
  console.log("bill being inserted ", bill);
  const response = await billServices.insertBill(bill);
  return response;
});

export const updateBill = createAsyncThunk("bill/update", async (bill) => {
  console.log("bill is being updated: ", bill);

  const response = await billServices.updateBill(bill);
  return response;
});

const billSlice = createSlice({
  name: "bill",
  initialState: {
    data: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get bills successfully", state.data);
      })

      .addCase(insertBill.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })

      .addCase(updateBill.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("update succesffuly");
        }
      });
  },
});

export default billSlice;
