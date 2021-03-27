import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const notiAPI = {
  getById: (id) => {
    const url = `/notifications/getnotificationbyaccountid?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default notiAPI;
