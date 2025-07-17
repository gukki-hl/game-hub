import React, { useEffect, useState } from "react";
import apiClientl from "../services/api-client";
interface Game {
  id: number;
  name: string;
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}
const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClientl
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });
  return (
    <div>
        {error && <p>{error}</p>}
      <ul>
        {games.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
      </ul>
    </div>
  );
};

export default GameGrid;
