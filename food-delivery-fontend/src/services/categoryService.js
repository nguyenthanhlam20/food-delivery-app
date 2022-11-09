import React from "react";
import { API } from "../constants";
import axios from "axios";
const categoryService = {
  getCategories: async (category) => {
    // console.log(category);
    const response = await axios.get(API.ADMIN.MANAGE_CATEGORY.GET_CATEGORIES);
    return response.data;
  },
  changeActveStatus: async (category) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_CATEGORY.CHANGE_CATEGORY_ACTIVE_STATUS,
      category
    );
    return response.data;
  },
  getCategoryImages: async (categoryId) => {
    // console.log(API.ADMIN.MANAGE_CATEGORY.GET_CATEGORY_IMAGES);

    const response = await axios.post(
      API.ADMIN.MANAGE_CATEGORY.GET_CATEGORY_IMAGES,
      categoryId
    );

    // console.log(response.data);
    return response.data;
  },
  insertCategory: async (category) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_CATEGORY.INSERT_CATEGORY,
      category
    );
    return response.data;
  },
  updateCategory: async (category) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_CATEGORY.UPDATE_CATEGORY,
      category
    );

    return response.data;
  },
  deleteCategory: async (categoryId) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_CATEGORY.DELETE_CATEGORY,
      categoryId
    );
    return response.data;
  },
};

export default categoryService;
