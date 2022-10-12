import axios from "axios";

import { USER_API } from "../constants";

const userServices = {
  getUsers: async () => {
    const response = await axios.get(USER_API.GET_USERS);
    return response.data;
  },
};

export default userServices;
