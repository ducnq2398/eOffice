import axiosClient from './axiosClient';

const loginAPI = {
    loginAdmin: (params) =>{
        const url = '/Admins/login';
        return axiosClient.post(url, { params });
    },

    loginUser: (params) =>{
        const url = '/Accounts/login';
        return axiosClient.post(url, {params});
    }
}

export default loginAPI;