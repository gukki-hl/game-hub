import { useQuery } from "@tanstack/react-query";
import Trailers from "../entities/Trailers";
import apiClient from "../services/api-client";

const useTrailes = (id: number) => {
  const create = new apiClient<Trailers>(`/games/${id}/movies`);
  return useQuery({
    queryKey: ["trailers", id],
    queryFn: create.getAll,
  });
};

export default useTrailes;
