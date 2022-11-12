import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartServices } from "../services";
import { async } from "@firebase/util";

export const getCartInfo = createAsyncThunk("cart/get", async (username) => {
  const response = await cartServices.getCartInfo(username);
  // console.log(response);
  return response;
});

export const insertFood = createAsyncThunk("cart/insert", async (cart) => {
  console.log("cart being inserted ", cart);
  const response = await cartServices.insertFood(cart);
  return response;
});

export const updateFood = createAsyncThunk("cart/update", async (cart) => {
  console.log("food in cart is being updated: ", cart);
  const response = await cartServices.updateFood(cart);
  return response;
});

export const deleteFood = createAsyncThunk("cart/delete", async (cartId) => {
  console.log("cart is being deleted: ", cartId);
  const response = await cartServices.deleteFood(cartId);
  return response;
});

export const clearCart = createAsyncThunk("cart/clear", async (username) => {
  console.log("cart of username is being cleared", username);
  const response = await cartServices.clearCart(username);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get cart successfully", state.data);
      })

      .addCase(insertFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert food to cart succesffuly");
        }
      })

      .addCase(updateFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("edit food in cart succesffuly");
        }
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected > 0) {
          state.isRefresh = true;
          console.log("delee food from cart succesffuly");
        }
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        if (action.payload.rowAffected > 0) {
          state.isRefresh = true;
          console.log("clear cart successfully");
        }
      });
  },
});

export default cartSlice;
