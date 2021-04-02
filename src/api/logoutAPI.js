import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const logoutAPI = {
  logout: (params) => {
    const url = "/accounts/logout";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default logoutAPI;
