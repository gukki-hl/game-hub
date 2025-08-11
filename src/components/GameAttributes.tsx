import { SimpleGrid, Text } from "@chakra-ui/react";
import { Game } from "../entities/Game";
import CriticScore from "./CriticScore";
import Definitionitem from "./Definitionitem";
interface Props {
  game?: Game;
}
const GameAttronutes = ({ game }: Props) => {
  return (
    <>
      <SimpleGrid as="dl" columns={2}>
        <Definitionitem term="Platform">
          {game?.parent_platforms.map(({ platform }) => (
            <Text key={platform.id}>{platform.name}</Text>
          ))}
        </Definitionitem>
        <Definitionitem term="Metascore">
          <CriticScore score={game?.metacritic!} />
        </Definitionitem>
        <Definitionitem term="Genres">
          {game?.genres.map((g) => (
            <Text key={g.id}>{g.name}</Text>
          ))}
        </Definitionitem>
        <Definitionitem term="Publishers">
          {game?.publishers?.map((p) => (
            <Text key={p.id}>{p.name}</Text>
          ))}
        </Definitionitem>
      </SimpleGrid>
    </>
  );
};

export default GameAttronutes;
