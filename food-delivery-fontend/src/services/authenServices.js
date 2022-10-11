import React from "react";
import { AUTHEN } from "../constants";
import axios from "axios";

export const authenServices = {
  signin: async (user) => {
    // console.log(user);
    const response = await axios.post(AUTHEN.SIGN_IN, user, {
      headers: {
        authorization: "Bearer " + user.token,
      },
    });
    return response.data;
  },
  signup: async (user) => {
    const response = await axios.post(AUTHEN.SIGN_UP, user);
    return response.data;
  },
};
