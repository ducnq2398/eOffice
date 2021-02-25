import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://datnxeoffice.azurewebsites.net/api'
  })
export default axiosClient;