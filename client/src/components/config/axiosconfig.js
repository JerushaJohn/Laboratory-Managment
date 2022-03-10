
import axios from "axios";
const url = 'http://localhost:4400/';
const token = localStorage.getItem('isAuthenticated');
console.log(token, ' -----in config')
const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ` + token
    }
})

export default axiosInstance