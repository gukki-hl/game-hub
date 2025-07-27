import {Heading} from "@chakra-ui/react";
import {GameQuery} from "../App";
import useGenre from "../hooks/useGenre";
import usePlatforms from '../hooks/usePlatofroms'

interface Props {
    gameQuery: GameQuery;
}

const GameHeading = ({gameQuery}: Props) => {
    const platform = usePlatforms(gameQuery.platformId);
    const genre = useGenre(gameQuery.genreId)
    const heading = `${platform?.name || ""} ${genre?.name || ""} Game`;

    return (
        <Heading marginX={10} fontSize="5xl">
            {heading}{" "}
        </Heading>
    );
};
export default GameHeading;
