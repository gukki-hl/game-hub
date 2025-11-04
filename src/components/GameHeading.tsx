import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatforms from "../hooks/usePlatofroms";
import useGameQeuryStore from "../store";

const GameHeading = () => {
  const setGenreId = useGameQeuryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(setGenreId);

  const setPlatformsId = useGameQeuryStore((s) => s.gameQuery.platformId);
  const platform = usePlatforms(setPlatformsId);

  const heading = `${platform?.name || ""} ${genre?.name1 || ""} Game`;

  return (
    <Heading marginX={10} fontSize="5xl">
      {heading}{" "}
    </Heading>
  );
};
export default GameHeading;
