import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const userListAPI = {
  getAll: () => {
    const url = "/accounts/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getUserByCompanyId: (id) => {
    const url = `/accounts/getbycompany?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getUserById: (id) => {
    const url = `/accounts/${id}`;
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
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  activeUser: (id) =>{
    const url = `/accounts/activateaccount?accountId=${id}`;
    return axiosClient.put(url, '', {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deActiveUser: (id) => {
    const url = `/accounts/deactivateaccount?accountId=${id}`;
    return axiosClient.put(url, '', {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  changePassword : (params) =>{
    const url = '/accounts/changepassword';
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  changeAvatar: (params) =>{
    const url = '/accounts/updateaccount';
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  forgotPassword: (params) =>{
    const url = "/accounts/forgotpassword";
    return axiosClient.put(url, params);
  }
};
export default userListAPI;
