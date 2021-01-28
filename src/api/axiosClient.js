import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://datnxeoffice.azurewebsites.net/api',
    headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      }
});

export default axiosClient;