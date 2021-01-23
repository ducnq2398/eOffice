import axiosClient from './axiosClient';

const companyListAPI = {
    getAll: (params) =>{
        const url = 'api/users';
        return axiosClient.get(url, {params});
    },

    getById: (id) =>{
        const url = '/page';
        return axiosClient.get(url, {id});
    },
}

export default companyListAPI;