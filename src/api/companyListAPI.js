import axiosClient from './axiosClient';

const companyListAPI = {
    getAll: () =>{
        const url = 'companies/getall';
        return axiosClient.get(url);
    },
    getCompanyById: (id) =>{
        const url = `companies/${id}`;
        return axiosClient.get(url)
    }
}

export default companyListAPI;