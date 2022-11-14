import axios from "axios";

import { API } from "../constants";

const userServices = {
  getUsers: async () => {
    const response = await axios.get(API.ADMIN.MANAGE_USER.GET_USERS);
    return response.data;
  },
  updateUserInfo: async (user) => {
    const response = await axios.post(API.ADMIN.MANAGE_USER.UPDATE_USER, user);
    return response.data;
  },
  getUserByUsername: async (username) => {
    const response = await axios.post(
      API.ADMIN.MANAGE_USER.GET_BY_USERNAME,
      username
    );
    return response.data;
  },
};

export default userServices;
