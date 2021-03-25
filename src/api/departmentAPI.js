import { getUser } from "../utils/Common";
import axiosClient from "./axiosClient";

const departmentAPI = {
  getDepartmentById: (id) => {
    const url = `departments/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getDepartmentByCompanyId: (id) => {
    const url = `departments/getbycompany?companyId=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getSubDepartment: (id) => {
    const url = `subdepartments/getbydepartment?derpartmentId=${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addDepartment: (params) => {
    const url = "/departments/adddepartment";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  addSubDepartment: (params) => {
    const url = "/subdepartments/addsubdepartment";
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  getSubDepartmentById: (id) => {
    const url = `/subdepartments/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  editDepartmentById: (params) => {
    const url = "/departments/updatedepartment";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};
export default departmentAPI;
