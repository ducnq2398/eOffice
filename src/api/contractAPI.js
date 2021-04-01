import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const contractAPI = {
  addContract: (params) => {
    const url = "/contracts/addcontract";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addSignContract: (params) => {
    const url = "/api/contracts/addsignertocontract";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addViewerContract: (params) => {
    const url = "/api/contracts/addviewertocontract";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getContractBySignerId: (id) => {
    const url = `/contracts/getbysignerid?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getContractByViewerId: (id) => {
    const url = `/contracts/getbyviewerid?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getContractById: (id) => {
    const url = `/contracts/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getContractByCompanyId: (id) => {
    const url = `/contracts/getbycompany?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deleteContract: (id) => {
    const url = `/contracts/deletecontract?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};
export default contractAPI;
