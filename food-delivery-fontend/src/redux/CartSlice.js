import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartServices } from "../services";
import { async } from "@firebase/util";

export const getCartInfo = createAsyncThunk("cart/get", async () => {
  const response = await cartServices.getCartInfo();
  // console.log(response);
  return response;
});

export const insertFood = createAsyncThunk("cart/insert", async (cart) => {
  console.log("cart being inserted ", cart);
  const response = await cartServices.insertFood(cart);
  return response;
});

export const updateFood = createAsyncThunk("cart/update", async (cart) => {
  console.log("cart is being updated: ", cart.cart_id);
  console.log("Old images:", cart.old_images);
  console.log("New images:", cart.new_images);
  const response = await cartServices.updateFood(cart);
  return response;
});

export const deleteFood = createAsyncThunk("cart/delete", async (cartId) => {
  console.log("cart is being deleted: ", cartId);
  const response = await cartServices.deleteFood(cartId);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get categories successfully", state.data);
      })

      .addCase(insertFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })

      .addCase(updateFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("edit succesffuly");
        }
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected > 0) {
          state.isRefresh = true;
          console.log("delete succesffuly");
        }
      });
  },
});

export default cartSlice;
