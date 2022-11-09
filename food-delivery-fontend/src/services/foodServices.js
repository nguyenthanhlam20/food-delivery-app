import React from "react";
import { API } from "../constants";
import axios from "axios";
const foodServices = {
  getFoods: async (food) => {
    // console.log(food);
    const response = await axios.get(API.ADMIN.MANAGE_FOOD.GET_FOODS);
    return response.data;
  },
  changeActveStatus: async (food) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_FOOD.CHANGE_FOOD_ACTIVE_STATUS,
      food
    );
    return response.data;
  },
  getFoodImages: async (foodId) => {
    // console.log(API.ADMIN.MANAGE_food.GET_food_IMAGES);

    const response = await axios.post(
      API.ADMIN.MANAGE_FOOD.GET_FOOD_IMAGES,
      foodId
    );

    // console.log(response.data);
    return response.data;
  },
  insertFood: async (food) => {
    const response = await axios.post(API.ADMIN.MANAGE_FOOD.INSERT_FOOD, food);
    return response.data;
  },
  editFood: async (food) => {
    const response = await axios.post(API.ADMIN.MANAGE_FOOD.UPDATE_FOOD, food);

    return response.data;
  },
  deleteFood: async (foodId) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_FOOD.DELETE_FOOD,
      foodId
    );
    return response.data;
  },
};

export default foodServices;
