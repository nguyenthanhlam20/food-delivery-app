import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantServices } from "../services";
import { async } from "@firebase/util";

export const getRestaurants = createAsyncThunk("restaurant/get", async () => {
  const response = await restaurantServices.getRestaurants();
  // console.log(response);
  return response;
});

export const insertRestaurant = createAsyncThunk(
  "restaurant/insert",
  async (restaurant) => {
    console.log(restaurant);
    const response = await restaurantServices.insertRestaurant(restaurant);
    return response;
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurant/update",
  async (restaurant) => {
    const response = await restaurantServices.updateRestaurant(restaurant);
    return response;
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurant/delete",
  async (restaurantId) => {
    const response = await restaurantServices.deleteRestaurant(restaurantId);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    data: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
      })
      .addCase(insertRestaurant.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("edit succesffuly");
        }
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        if (action.payload.rowAffected > 0) {
          state.isRefresh = true;
          console.log("delete succesffuly");
        }
      });
  },
});

export default restaurantSlice;
