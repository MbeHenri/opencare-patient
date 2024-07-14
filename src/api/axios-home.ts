import axios, { AxiosInstance } from "axios";

const OPENCARE_SWITCH = process.env.OPENCARE_SERVER;

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8013", // URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
