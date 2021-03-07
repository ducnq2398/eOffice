import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const companyListAPI = {
  getAll: () => {
    const url = "companies/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getCompanyById: (id) => {
    const url = `companies/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default companyListAPI;
