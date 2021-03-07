import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const userListAPI = {
  getAll: () => {
    const url = "accounts/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getUserByCompanyId: (id) => {
    const url = `accounts/getbycompany?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getUserById: (id) => {
    const url = `accounts/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addUser: (params) => {
    const url = "/accounts/addaccount";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  updateUser: (params) =>{
    const url = "/accounts/updateaccount";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  }
};
export default userListAPI;
