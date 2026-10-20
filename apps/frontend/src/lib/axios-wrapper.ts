import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

API.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(
        new Error(error.response.data.message ?? "Something went wrong"),
      );
    }

    return Promise.reject(new Error(error.message ?? "Something went wrong"));
  },
);

export default API;
