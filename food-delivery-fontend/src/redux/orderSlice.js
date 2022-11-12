import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "../services";

export const getAll = createAsyncThunk("order/get", async () => {
  console.log("We are gonna get all orders");
  const response = await orderServices.getAll();
  return response;
});

export const getByUsername = createAsyncThunk(
  "order/get/by/username",
  async (username) => {
    console.log("get orders by username", username);
    const response = await orderServices.getByUsername(username);
    return response;
  }
);

export const insertOrder = createAsyncThunk("order/insert", async (order) => {
  console.log("order being inserted ", order);
  const response = await orderServices.insertOrder(order);
  return response;
});

export const updateOrder = createAsyncThunk("order/update", async (order) => {
  console.log("order is being updated: ", order);

  const response = await orderServices.updateOrder(order);
  return response;
});

const orderSlice = createSlice({
  name: "order",
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
        console.log("Get orders successfully", state.data);
      })
      .addCase(getByUsername.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get orders successfully", state.data);
      })

      .addCase(insertOrder.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("update succesffuly");
        }
      });
  },
});

export default orderSlice;
