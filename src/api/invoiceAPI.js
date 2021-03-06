import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const invoiceAPI = {
  addInvoice: (params) => {
    const url = "/invoices/addinvoice";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addViewerInvoice: (params) => {
    const url = "/invoices/addviewertoinvoice";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getAllInvoice: () => {
    const url = "invoices/getall";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getInvoiceById: (id) => {
    const url = `invoices/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getInvoiceBySignerId: (id) => {
    const url = `/invoices/getbysignerid?signerId=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getInvoiceByViewerId: (id) => {
    const url = `/invoices/getbyviewerid?viewerId=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getInvoiceByCompanyId: (id) => {
    const url = `/invoices/getbycompany?id=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deleteInvoice: (id) => {
    const url = `/invoices/deleteinvoice?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};
export default invoiceAPI;
