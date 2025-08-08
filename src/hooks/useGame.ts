import {useInfiniteQuery} from "@tanstack/react-query";
import apiClient, {FetchResponse} from "../services/api-client";
import {Platforms} from "../hooks/usePlatform";
import ms from "ms";
import useGameQeuryStore from "../store";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platforms }[];
    metacritic: number;
    rating_top: number;
}

const create = new apiClient<Game>("/games");

const useGame = () => {
    const gameQuery = useGameQeuryStore(s => s.gameQuery)
    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["/games", gameQuery], // 缓存 key
        queryFn: ({pageParam = 1}) =>
            create.getAll({
                params: {
                    genres: gameQuery.genreId,
                    parent_platforms: gameQuery.platformId,
                    ordering: gameQuery.sortOrders,
                    search: gameQuery.searchText,
                    page: pageParam,
                },
            }),
        // 判断是否还有下一页：如果本页有数据，就尝试加载下一页（页码 = 当前页数 + 1）
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms('24h'),// 数据在24小时内不会过期
    });

}

export default useGame;
