import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const validateAPI = {
  checkPhone: (phone) => {
    const url = `/accounts/checkphone?phonenumber=%2B${phone}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  checkEmail: (email) => {
    const url = `/accounts/checkemail?email=${email}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};

export default validateAPI;
