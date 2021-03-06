import axiosClient from './axiosClient';

const loginAPI = {
    loginAdmin: (params) =>{
        const url = '/admins/login';
        return axiosClient.post(url, params);
    },

    loginUser: (params) =>{
        const url = '/accounts/login';
        return axiosClient.post(url, params);
    }
}

export default loginAPI;