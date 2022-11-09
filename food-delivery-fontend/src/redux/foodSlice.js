import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { foodServices } from "../services";
import { async } from "@firebase/util";

export const getFoods = createAsyncThunk("food/get", async () => {
  const response = await foodServices.getFoods();
  // console.log(response);
  return response;
});

export const setFoodImages = createAsyncThunk(
  "food/get/images",
  async (foodId) => {
    // console.log(foodId);
    const response = await foodServices.setFoodImages(foodId);
    return response;
  }
);

export const insertFood = createAsyncThunk("food/insert", async (food) => {
  console.log("food being inserted ", food);
  const response = await foodServices.insertFood(food);
  return response;
});

export const changeActveStatus = createAsyncThunk(
  "food/change/status",
  async (food) => {
    console.log("food is being change status ", food);
    const response = await foodServices.changeActveStatus(food);
    return response;
  }
);

export const editFood = createAsyncThunk("food/update", async (food) => {
  console.log("food is being updated: ", food);
  console.log("Old images:", food.old_images);
  console.log("New images:", food.images);
  const response = await foodServices.editFood(food);
  return response;
});

export const deleteFood = createAsyncThunk("food/delete", async (foodId) => {
  console.log("food is being deleted: ", foodId);
  const response = await foodServices.deleteFood(foodId);
  return response;
});

const foodSlice = createSlice({
  name: "food",
  initialState: {
    data: [],
    images: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get foods successfully", state.data);
      })
      .addCase(setFoodImages.fulfilled, (state, action) => {
        state.images = action.payload.food_images;
        console.log("Get food images successfully", state.images);
      })
      .addCase(insertFood.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })
      .addCase(changeActveStatus.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log(
            `change status of food ${action.payload.food} succesffuly`
          );
        }
      })
      .addCase(editFood.fulfilled, (state, action) => {
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

export default foodSlice;
