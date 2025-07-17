import React, { useEffect, useState } from "react";
import apiClientl from "../services/api-client";
import useGame from "../hooks/useGame";
const GameGrid = () => {
  const { games, error } = useGame();

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
