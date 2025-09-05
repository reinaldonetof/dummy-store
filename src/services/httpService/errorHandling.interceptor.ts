import { AxiosError } from "axios";

const ErrorHandlingInterceptor = (error: AxiosError<any>) => {
  console.warn("[HTTP ERROR]", {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    data: error.response?.data,
    message: error.message,
  });

  const normalized = new Error(
    error.response?.data?.message ||
      error.message ||
      "Network error. Please try again."
  );
  return Promise.reject(normalized);
};

export default ErrorHandlingInterceptor;
