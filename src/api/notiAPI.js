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
  changeStatus: (params) => {
    const url = "/notifications/changestatus";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  seenAllNotifications: (id) => {
    const url = `/notifications/seenallnoti?accountid=${id}`;
    return axiosClient.put(url, id, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default notiAPI;
