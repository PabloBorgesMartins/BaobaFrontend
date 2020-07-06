import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-18-231-167-59.sa-east-1.compute.amazonaws.com:3000',
});

export default api;
