import {useQuery} from "@tanstack/react-query";
import apiClient from "../services/api-client";
import platform from "../data/platform";
import ms from "ms";

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
        staleTime: ms('24h'),// 数据在24小时内不会过期
        initialData: platform // 提供一组静态数据作为初始值
    });

// const usePlatform = () => useData<Platforms>('/platforms/lists/parents')
export default usePlatform;
