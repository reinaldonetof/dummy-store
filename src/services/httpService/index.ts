import axios, { AxiosResponse } from "axios";
import ErrorHandlingInterceptor from "./errorHandling.interceptor";

const API_BASE_URL = "https://dummyjson.com";
const TIMEOUT = 10000;

const HttpService = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    Accept: "application/json",
  },
});

HttpService.interceptors.response.use((response: AxiosResponse<any, any>) => {
  return response;
}, ErrorHandlingInterceptor);

export default HttpService;
