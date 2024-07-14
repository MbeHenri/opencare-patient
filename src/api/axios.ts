import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: "http://doctor.backbone-corp.com:8013", // URL of your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
