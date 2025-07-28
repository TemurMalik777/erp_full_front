import axios from "axios";
import { clearStorage, getItem, Notification } from "@helpers";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const access_token = getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Error: token chiridi krch");
      window.location.href = "/";
      clearStorage();
    }
    return Promise.reject(error);
  }
);

export const logout = () => {
  clearStorage();
  Notification("success", "Siz yoq siz endi");
  window.location.href = "/";
}

export default axiosInstance;
