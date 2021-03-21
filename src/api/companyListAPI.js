import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const companyListAPI = {
  getAll: () => {
    const url = "/companies/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getCompanyById: (id) => {
    const url = `/companies/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addCompany: (params) => {
    const url = "/companies/addcompany";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  updateCompany: (params) =>{
    const url = "/companies/updatecompany";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    })
  },
  activeCompany: (id) =>{
    const url = `/companies/activatecompany`;
    return axiosClient.put(url, '', {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    })
  }
};

export default companyListAPI;
