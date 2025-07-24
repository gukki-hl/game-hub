import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
export interface Platforms {
  id: number;
  name: string;
  slug: string;
}
const create = new apiClient<Platforms>("/platforms/lists/parents");

const usePlatform = () =>
  useQuery({
    queryKey: ["/platforms"], // 缓存 key
    queryFn: create.getAll,
    staleTime: 24 * 60 * 60 * 1000,
  });

// const usePlatform = () => useData<Platforms>('/platforms/lists/parents')
export default usePlatform;
