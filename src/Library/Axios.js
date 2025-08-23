import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://your-production-api.com"; 

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
