import axiosClient from './axiosClient';

const invoiceAPI = {
    addInvoice: (params) =>{
        const url = "/invoices/addinvoice";
        return axiosClient.post(url, params);
    },
    getAllInvoice: () =>{
        const url = "invoices/getall";
        return axiosClient.get(url);
    },
    getInvoiceById: (id) =>{
        const url = `invoices/${id}`;
        return axiosClient.get(url);
    },
    getInvoiceBySignerId: (id) =>{
        const url = `/invoices/getinvoicesbysignerid?signerId=${id}`;
        return axiosClient.get(url);
    },
    getInvoiceByViewerId: (id) =>{
        const url = `/invoices/getinvoicesbyviewerid?viewerId=${id}`;
        return axiosClient.get(url);
    },
    getInvoiceByCompanyId: (id) =>{
        const url = `/invoices/getbycompanyid?id=${id}`;
        return axiosClient.get(url);
    }
}
export default invoiceAPI;