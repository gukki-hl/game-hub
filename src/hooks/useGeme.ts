import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import Game  from "../entities/Game";


const carete = new apiClient<Game>('/games')

const useGame = (slug:string) => useQuery({
    queryKey:['games',slug],
    queryFn: () => carete.get(slug)
})
export default useGame;