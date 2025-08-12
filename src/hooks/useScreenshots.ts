import { useQuery } from "@tanstack/react-query";
import { screenshots } from "../entities/ScreenShots";
import apiClient from "../services/api-client";
const useScreenShots = (gameId: number) => {
  const create = new apiClient<screenshots>(`/games/${gameId}/screenshots`);
  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: create.getAll,
  });
};
export default useScreenShots;
