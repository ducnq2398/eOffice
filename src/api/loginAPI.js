import axios from 'axios';
import axiosClient from './axiosClient';

const loginAPI = {
    loginAdmin: (params) =>{
        const url = '/Admins/login';
        return axiosClient.post(url, { params });
    },
}

export default loginAPI;