import axios from "axios";
import { useAuthStore } from "../stores/user.store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// add token to request

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific status codes here
    if (error.response?.status === 401) {
      // e.g., redirect to login
      useAuthStore.getState().clearAuth();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);
