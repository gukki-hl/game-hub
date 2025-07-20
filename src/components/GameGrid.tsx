import useGame from "../hooks/useGame";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";
import {Platforms} from "../hooks/usePlatform";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform:Platforms |null
}
// GameGrid组件接受一个selectedGenre属性，用于过滤游戏列表
const GameGrid = ({selectedGenre,selectedPlatform}:Props) => {
  const { data, error, isLoading } = useGame(selectedGenre,selectedPlatform);
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
            <GameCardContainer key={s}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GameGrid;
