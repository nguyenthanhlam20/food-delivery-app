import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../services";
import { async } from "@firebase/util";

export const getCategories = createAsyncThunk("category/get", async () => {
  const response = await categoryService.getCategories();
  // console.log(response);
  return response;
});

export const getCategoryImages = createAsyncThunk(
  "category/get/images",
  async (categoryId) => {
    // console.log(categoryId);
    const response = await categoryService.getCategoryImages(categoryId);
    return response;
  }
);

export const insertCategory = createAsyncThunk(
  "category/insert",
  async (category) => {
    console.log("category being inserted ", category);
    const response = await categoryService.insertCategory(category);
    return response;
  }
);

export const changeActveStatus = createAsyncThunk(
  "category/change/status",
  async (category) => {
    console.log("category is being change status ", category);
    const response = await categoryService.changeActveStatus(category);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (category) => {
    console.log("Category is being updated: ", category.category_id);
    console.log("Old images:", category.old_images);
    console.log("New images:", category.new_images);
    const response = await categoryService.updateCategory(category);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId) => {
    console.log("Category is being deleted: ", categoryId);
    const response = await categoryService.deleteCategory(categoryId);
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    images: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
        console.log("Get categories successfully", state.data);
      })
      .addCase(getCategoryImages.fulfilled, (state, action) => {
        state.images = action.payload.category_images;
        console.log("Get category images successfully", state.images);
      })
      .addCase(insertCategory.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
        }
      })
      .addCase(changeActveStatus.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log(
            `change status of category ${action.payload.category} succesffuly`
          );
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("edit succesffuly");
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload.rowAffected > 0) {
          state.isRefresh = true;
          console.log("delete succesffuly");
        }
      });
  },
});

export default categorySlice;
