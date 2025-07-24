import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const axiousInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "187a021ec38a4b23a11b62d17a5e7cdc",
  },
});

class apiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiousInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default apiClient;
