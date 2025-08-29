import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerceusingmernstack-backend.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
