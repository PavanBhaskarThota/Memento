import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:7000",
  // baseURL: "http://192.168.248.74:7300",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
