import React from "react";
import { API } from "../constants";
import axios from "axios";
const cartServices = {
  getCartInfo: async (username) => {
    // console.log(cart);
    const response = await axios.post(API.ADMIN.MANAGE_CART.GET_INFO, username);
    return response.data;
  },

  insertFood: async (cart) => {
    console.log("ccc", cart);
    const response = await axios.post(API.ADMIN.MANAGE_CART.INSERT_FOOD, cart);
    return response.data;
  },
  updateFood: async (cart) => {
    const response = await axios.post(API.ADMIN.MANAGE_CART.UPDATE_FOOD, cart);

    return response.data;
  },
  deleteFood: async (cart) => {
    const response = await axios.post(API.ADMIN.MANAGE_CART.DELETE_FOOD, cart);
    return response.data;
  },
  clearCart: async (username) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_CART.CLEAR_CART,
      username
    );
    return response.data;
  },
};

export default cartServices;
