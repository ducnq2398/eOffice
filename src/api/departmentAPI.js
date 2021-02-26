import axiosClient from './axiosClient';

const departmentAPI = {
    getDepartmentById: (id) =>{
        const url = `departments/${id}`;
        return axiosClient.get(url);
    },
    getDepartmentByCompanyId: (id)=>{
        const url = `departments/getbycompany?companyId=${id}`
        return axiosClient.get(url)
    },
    getSubDepartment: (id) =>{
        const url = `subdepartments/getbydepartment?derpartmentId=${id}`;
        return axiosClient.get(url)
    }
}
export default departmentAPI;