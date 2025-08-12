import { Spinner } from "@chakra-ui/react";
import useTrailes from "../hooks/useTrailes";
interface Props {
  gameId?: number;
}

const GameTrailers = ({ gameId }: Props) => {
  const { data: trailer, error, isLoading } = useTrailes(gameId!);
  const first = trailer?.results[0];

  if (isLoading) return <Spinner />;
  if (error) throw error;
  return first ? (
    <video src={first.data[480]} poster={first.preview} controls />
  ) : null;
};

export default GameTrailers;
