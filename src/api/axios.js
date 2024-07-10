import axios from "axios";

//const OPENCARE_SERVER = process.env.REACT_APP_OPENCARE_SERVER;

const api = axios.create({
  baseURL: "http://localhost:3001", // URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
