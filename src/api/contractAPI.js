import axiosClient from './axiosClient';

const contractAPI = {
    addContract: (params) =>{
        const url = "/contracts/addcontract";
        return axiosClient.post(url, params);
    },
    addSignContract: (params) =>{
        const url = "/api/contracts/addsigntocontract";
        return axiosClient.post(url, params);
    },
    addViewerContract: (params) =>{
        const url = "/api/contracts/addviewertocontract";
        return axiosClient.post(url, params);
    },
    getContractBySignerId: (id) =>{
        const url = `/contracts/getbysignerid?id=${id}`;
        return axiosClient.get(url);
    },
    getContractByViewerId: (id) =>{
        const url = `/contracts/getbyviewrid?id=${id}`;
        return axiosClient.get(url);
    },
    getContractById: (id) =>{
        const url = `/contracts/${id}`;
        return axiosClient.get(url);
    },
    getContractByCompanyId: (id) =>{
        const url = `/contracts/getbycompany?id=${id}`;
        return axiosClient.get(url)
    } 
}
export default contractAPI;