import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import apiClient, { FetchResponse } from "../services/api-client";
import { Platforms } from "../hooks/usePlatform";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platforms }[];
  metacritic: number;
  rating_top: number;
}

//接收一个selectedGenre参数，用于过滤游戏列表
//如果selectedGenre为null，则不进行过滤，返回所有游戏

const useGame = (gameQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["/games", gameQuery], // 缓存 key
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrders,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data),
  });

//你写的 useData 是自己封装的 useState + useEffect 异步处理逻辑，
// 手动管理了 data, error, isLoading 三个状态，
// 而 useGenres 是用 React Query 自动管理这些状态的。
// const useGame = (gameQuery: GameQuery) =>
//     useData<Game>(
//         "/games",
//         {
//             params: {
//                 genres: gameQuery.genre?.id,
//                 platforms: gameQuery.platform?.id,
//                 ordering: gameQuery.sortOrders,
//                 search: gameQuery.searchText
//             },
//         },
//         [gameQuery]
//     );

export default useGame;
