import useGame from "../hooks/useGame";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

const GameGrid = () => {
  const { data, error, isLoading } = useGame();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {error && <p>{error}</p>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10"
        spacing={3}
      >
        {isLoading &&
          skeletons.map((s) => (
            <GameCardContainer>
              <GameCardSkeleton key={s} />
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer>
            <GameCard key={game.id} game={game}/>
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GameGrid;
