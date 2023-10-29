import axios, { AxiosRequestHeaders } from "axios";
import { getFromLocalStorage } from "../helper/base.helpers";


const axiosClient = axios.create({
  // baseURL: "https://dabit-store-server.herokuapp.com/api",
  baseURL: "https://test1-1m9m.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getFromLocalStorage("token");
    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`,
    };
    if (token) config.headers = { ...config.headers, ...headers };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data; //thay vi sever tra 1 dong response minh chi lay data nen respone.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return error;
  }
);

export default axiosClient;
