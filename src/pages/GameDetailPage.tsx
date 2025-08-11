import { Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttronutes from "../components/GameAttributes";
import useGame from "../hooks/useGeme";
const GameDetailPage = () => {
  const { slug } = useParams(); //获取当前动态路由参数，如 /users/:id 中的 id
  // console.log('111',slug);
  const { data: game, error, isLoading } = useGame(slug!);
  console.log("222", game?.publishers);

  if (isLoading) return <Spinner />;
  if (error) throw error;
  return (
    <>
      <Heading>{game?.name}</Heading>
      <ExpandableText>{game?.description_raw!}</ExpandableText>
      <GameAttronutes game={game}/>
    </>
  );
};

export default GameDetailPage;
