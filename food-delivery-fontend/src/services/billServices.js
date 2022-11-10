import React from "react";
import { API } from "../constants";
import axios from "axios";
const billServices = {
  getAll: async () => {
    // console.log(bill);
    const response = await axios.get(API.ADMIN.MANAGE_BILL.GET_ALL);
    return response.data;
  },
  getByUsername: async(username) {
    const response = await axios.post(API.ADMIN.MANAGE_BILL.GET_BY_USERNAME, username);
    return response.data;
  },
  insertBill: async (bill) => {
    console.log("ccc", bill);
    const response = await axios.post(API.ADMIN.MANAGE_BILL.INSERT_BILL, bill);
    return response.data;
  },
  updateBill: async (bill) => {
    const response = await axios.post(API.ADMIN.MANAGE_BILL.UPDATE_BILL, bill);
    return response.data;
  },
  
};

export default billServices;
