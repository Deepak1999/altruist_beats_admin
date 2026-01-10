
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api_base_url from '../components/Api_base_url/Api_base_url';

const axiosInstance = axios.create({
  baseURL: `${Api_base_url}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const navigate = useNavigate();
    const jwttoken = localStorage.getItem('jwttoken');
    const id = localStorage.getItem('id');

    if (jwttoken) {
      config.headers['jwttoken'] = jwttoken;
    }
    if (id) {
      config.headers['userId'] = id;
    }


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 500) {
      // navigate('/');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
