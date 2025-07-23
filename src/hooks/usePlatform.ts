import { useQuery } from "@tanstack/react-query";
import apiClient, { FetchResponse } from "../services/api-client";
export interface Platforms {
  id: number;
  name: string;
  slug: string;
}

const usePlatform = () =>
  useQuery({
    queryKey: ["/platforms"], // 缓存 key
    queryFn: () =>
      apiClient
        .get<FetchResponse<Platforms>>("/platforms/lists/parents")
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000,
  });

// const usePlatform = () => useData<Platforms>('/platforms/lists/parents')
export default usePlatform;
