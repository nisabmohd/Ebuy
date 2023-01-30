import axios, { InternalAxiosRequestConfig } from "axios";
import { url } from "../url";

const axiosInstance = axios.create({});

interface CustomAxios extends InternalAxiosRequestConfig<any> {
  headers: any;
}

axiosInstance.interceptors.request.use(
  async (config: CustomAxios) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post(`${url}/auth/token`, {
            token: refreshToken,
          });
          localStorage.setItem("access_token", response.data.access_token);

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          return await axiosInstance(originalRequest);
        } catch (err) {
          console.log(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const http = axiosInstance;