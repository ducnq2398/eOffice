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
    }
}
export default invoiceAPI;