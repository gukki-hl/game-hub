import {GameQuery} from "../App";
import useData from "./useData";

export interface platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: platform }[];
    metacritic: number;
}

//接收一个selectedGenre参数，用于过滤游戏列表
//如果selectedGenre为null，则不进行过滤，返回所有游戏
const useGame = (gameQuery: GameQuery) =>
    useData<Game>(
        "/games",
        {
            params: {
                genres: gameQuery.genre?.id,
                platforms: gameQuery.platform?.id,
                ordering: gameQuery.sortOrders
            },
        },
        [gameQuery]
    );

export default useGame;
