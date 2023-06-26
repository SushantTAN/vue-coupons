/* eslint-disable no-param-reassign */
import type { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestConfig<T = any> = AxiosRequestConfig & {
  data?: T;
};

async function requestInterceptor<I>(config: { headers: {} }) {
  // const session = await TokenUtils.getSession();

  // if (publicUrlAccess.includes(config?.url ?? "")) {
  config.headers = {};

  return config;
}

export { requestInterceptor };
