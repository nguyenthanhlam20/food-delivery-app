import React from "react";
import { API } from "../constants";
import axios from "axios";
const orderServices = {
  getAll: async () => {
    // console.log(order);
    const response = await axios.get(API.ADMIN.MANAGE_ORDER.GET_ALL);
    return response.data;
  },
  getByUsername: async (username) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_ORDER.GET_BY_USERNAME,
      username
    );
    return response.data;
  },
  insertOrder: async (order) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_ORDER.INSERT_ORDER,
      order
    );
    return response.data;
  },
  updateOrder: async (order) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_ORDER.UPDATE_ORDER,
      order
    );
    return response.data;
  },
};

export default orderServices;
