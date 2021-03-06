import axiosClient from './axiosClient';

const userListAPI = {
    getAll: () =>{
        const url = 'accounts/getall';
        return axiosClient.get(url);
    },
    getUserByCompanyId: (id) =>{
        const url = `accounts/getbycompany?id=${id}`;
        return axiosClient.get(url);
    },
    getUserById: (id) =>{
        const url = `accounts/${id}`;
        return axiosClient.get(url);
    },
    addUser: (params) =>{
        const url = '/accounts/addaccount';
        return axiosClient.post(url, params);
    }
}
export default userListAPI;