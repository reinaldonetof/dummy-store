import { AxiosError } from "axios";

const ErrorHandlingInterceptor = async (error: AxiosError<any, any>) => {
  return new Promise(async (resolve, reject) => {
    reject(error);
  });
};

export default ErrorHandlingInterceptor;
