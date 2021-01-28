import axiosClient from './axiosClient';

const companyListAPI = {
    getAll: () =>{
        const url = 'Companies/getall';
        return axiosClient.get(url);
    },
}

export default companyListAPI;