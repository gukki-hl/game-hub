import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import useGame from "../hooks/useGeme";
const GameDetailPage = () => {
const {slug} = useParams()//获取当前动态路由参数，如 /users/:id 中的 id
console.log('111',slug);
const {data:game,error,isLoading} = useGame(slug!)
// console.log('222',game);

if(isLoading) return <Spinner/>
if(error) throw  error
  return (
    <>
    <Heading>{game?.name}</Heading>
    <Text>{game?.description_raw}</Text>
    </>
  )
}

export default GameDetailPage