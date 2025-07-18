import useGame from "../hooks/useGame";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";

const GameGrid = () => {
  const { games, error } = useGame();

  return (
    <div>
      {error && <p>{error}</p>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10"
        spacing={10}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GameGrid;
