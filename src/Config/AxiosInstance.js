import axios from 'axios';
import { BASE_URL } from '../Constants/constance';



const AxiosInstance = axios.create({
    baseURL: BASE_URL
})

AxiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization']='Bearer '+token
    config.headers['Access-control-Allow-Orgin']='*'
    return config
})

export default AxiosInstance;