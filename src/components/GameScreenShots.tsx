import { Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import useScreenShots from "../hooks/useScreenshots";
interface Props {
  gameId: number;
}
const GameScreenShots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useScreenShots(gameId);
  console.log("data", data);
  if (isLoading) return null;
  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
      {data?.results.map((file) => (
        <Image key={file.id} src={file.image} />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenShots;
