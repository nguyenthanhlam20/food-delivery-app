import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../services";
import { async } from "@firebase/util";

export const getCategories = createAsyncThunk("category/get", async () => {
  const response = await categoryService.getCategories();
  // console.log(response);
  return response;
});

export const insertCategory = createAsyncThunk(
  "category/insert",
  async (category) => {
    console.log(category);
    const response = await categoryService.insertCategory(category);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (category) => {
    const response = await categoryService.updateCategory(category);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId) => {
    const response = await categoryService.deleteCategory(categoryId);
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    isRefresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isRefresh = false;
      })
      .addCase(insertCategory.fulfilled, (state, action) => {
        if (action.payload.rowAffected == 1) {
          state.isRefresh = true;
          console.log("insert succesffuly");
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
