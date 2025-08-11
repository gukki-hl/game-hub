import {useQuery} from "@tanstack/react-query";
import apiClient from "../services/api-client";
import genre from "../data/genre";
import ms from 'ms'
import { Genre } from "../entities/Genre";

const create = new apiClient<Genre>("/genres");

const useGenres = () =>
    useQuery({
        queryKey: ["/genres"], // 缓存 key
        queryFn: create.getAll,
        staleTime: ms('24h'),// 数据在24小时内不会过期
        initialData: genre // 提供一组静态数据作为初始值
    });

export default useGenres;
