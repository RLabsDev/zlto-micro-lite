import axios, { type AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://member.zlto.cloud/",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default apiClient;
