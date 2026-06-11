import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://full-stack-chat-application-hyes.onrender.com/api",
  withCredentials: true,
});

// Attach JWT token from localStorage to every request as a fallback
// for browsers that block cross-origin cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
