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
  editSubDepartmentById: (params) => {
    const url = "/subdepartments/updatesubdepartment";
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deleteSubDepartmentById: (id) => {
    const url = `/subdepartments/deletesubdepartment?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deleteDepartmentById: (id) => {
    const url = `/departments/deletedepartment?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deactiveDepartment: (id) => {
    const url = `/departments/deactivatedepartment?departmentid=${id}`;
    return axiosClient.put(url, "", {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
  deactiveSubDepartment: (id) => {
    const url = `/subdepartments/deactivatesubdepartment?subdepartmentid=${id}`;
    return axiosClient.put(url, "", {
      headers: {
        Authorization: `Bearer ${getUser().IdToken}`,
      },
    });
  },
};
export default departmentAPI;
