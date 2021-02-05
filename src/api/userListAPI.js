import axiosClient from './axiosClient';

const userListAPI = {
    getAll: () =>{
        const url = 'Accounts/getall';
        return axiosClient.get(url);
    },
    getUserByCompanyId: (id) =>{
        const url = `Accounts/getbycompany?id=${id}`;
        return axiosClient.get(url);
    },
    getUserById: (id) =>{
        const url = `Accounts/${id}`;
        return axiosClient.get(url);
    }
}
export default userListAPI;