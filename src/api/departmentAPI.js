import axiosClient from './axiosClient';

const departmentAPI = {
    getDepartmentById: (id) =>{
        const url = `Departments/${id}`;
        return axiosClient.get(url);
    }
}
export default departmentAPI;