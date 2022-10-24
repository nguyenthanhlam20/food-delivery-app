import React from "react";
import { API } from "../constants";
import axios from "axios";

const restaurantServices = {
  getRestaurants: async () => {
    console.log(API.ADMIN.MANAGE_RESTAURANT.GET_RESTAURANTS);
    const response = await axios.get(
      API.ADMIN.MANAGE_RESTAURANT.GET_RESTAURANTS
    );
    console.log(response.data);
    return response.data;
  },
  insertRestaurant: async (restaurant) => {
    console.log(API.ADMIN.MANAGE_RESTAURANT.GET_RESTAURANTS);
    const response = await axios.post(
      API.ADMIN.MANAGE_RESTAURANT.INSERT_RESTAURANT,
      restaurant
    );
    return response.data;
  },
  updateRestaurant: async (restaurant) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_RESTAURANT.UPDATE_RESTAURANT,
      restaurant
    );

    return response.data;
  },
  deleteRestaurant: async (restaurantId) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_RESTAURANT.DELETE_RESTAURANT,
      restaurantId
    );
    return response.data;
  },
};

export default restaurantServices;
