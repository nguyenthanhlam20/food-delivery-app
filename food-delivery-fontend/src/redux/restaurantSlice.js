import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantServices } from "../services";
import { async } from "@firebase/util";

export const getRestaurantById = createAsyncThunk(
  "restaurant/get/byid",
  async (restaurantId) => {
    console.log("Get restaurant by id ", restaurantId);
    const response = await restaurantServices.getRestaurantById(restaurantId);
    return response;
  }
);

export const getRestaurants = createAsyncThunk("restaurant/get", async () => {
  const response = await restaurantServices.getRestaurants();
  return response;
});

export const getRestaurantImages = createAsyncThunk(
  "restaurant/get/images",
  async (restaurantId) => {
    // console.log(categoryId);
    const response = await restaurantServices.getRestaurantImages(restaurantId);
    return response;
  }
);

export const changeActveStatus = createAsyncThunk(
  "restaurant/change/status",
  async (restaurant) => {
    console.log("restaurant is being change status ", restaurant);
    const response = await restaurantServices.changeActveStatus(restaurant);
    return response;
  }
);

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
    images: [],
    isRefresh: false,
    selectedRestaurant: null,
    currentRestaurantId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get restaurants successfully", state.data);
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.selectedRestaurant = action.payload;
        console.log("Get restaurant successfully", action.payload);
      })
      .addCase(getRestaurantImages.fulfilled, (state, action) => {
        state.images = action.payload.restaurant_images;
        console.log("Get restaurant images successfully", state.images);
      })
      .addCase(changeActveStatus.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log(
            `change status of restaurant ${action.payload.restaurant} succesffuly`
          );
        }
      })
      .addCase(insertRestaurant.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          state.currentRestaurantId = action.payload.currentRestaurantId;
          console.log("insert succesffuly", state.currentRestaurantId);
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
