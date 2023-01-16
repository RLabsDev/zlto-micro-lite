import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "../stores/user.store";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://member.zlto.cloud/",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

apiClient.interceptors.request.use((config) => {
  const userStore = useUserStore();
  config.headers!.Authorization = `Bearer ${userStore.getAccessToken}`;
  config.headers!.Accept = "application/json";
  return config;
});

export default apiClient;
