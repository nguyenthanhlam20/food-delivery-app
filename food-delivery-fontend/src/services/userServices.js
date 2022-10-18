import axios from "axios";

import { API } from "../constants";

const userServices = {
  getUsers: async () => {
    const response = await axios.get(API.ADMIN.MANAGE_USER.GET_USERS);
    return response.data;
  },
};

export default userServices;
