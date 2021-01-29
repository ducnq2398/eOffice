import axiosClient from './axiosClient';

const userListAPI = {
    getAll: () =>{
        const url = 'Accounts/getall';
        return axiosClient.get(url);
    },
}
export default userListAPI;