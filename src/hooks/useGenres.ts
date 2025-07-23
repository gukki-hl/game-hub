import { useQuery } from "@tanstack/react-query";
import apiClient, { FetchResponse } from "../services/api-client";
import genre from "../data/genre";
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["/genres"], // 缓存 key
    queryFn: () =>
      apiClient.get<FetchResponse<Genre>>("/genres").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 数据在24小时内不会过期
    initialData: {
      count: genre.length,
      results: genre,
    }, // 提供一组静态数据作为初始值
  });

export default useGenres;
