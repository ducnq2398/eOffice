import axiosClient from './axiosClient';

const departmentAPI = {
    getDepartmentById: (id) =>{
        const url = `departments/${id}`;
        return axiosClient.get(url);
    }
}
export default departmentAPI;