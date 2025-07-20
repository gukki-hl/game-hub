import useData from "./useData";
import {Genre} from "./useGenres";
import {Platforms} from "./usePlatform";

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
const useGame = (selectedGenre: Genre | null, selectedPlatform: Platforms | null) =>
    useData<Game>("/games", {params: {genres: selectedGenre?.id, platforms: selectedPlatform?.id}}, [
        selectedGenre?.id, selectedPlatform?.id
    ]);

export default useGame;
