import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const notiAPI = {
  getAll: () => {
    const url = "/notifications/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default notiAPI;
