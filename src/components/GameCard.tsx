import React from "react";
import {Game} from "../hooks/useGame";
import {Card, CardBody, Heading, HStack, Image, Text} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import Emoij from "./Emoij";

interface GameCardProps {
    game: Game;
}

const GameCard = ({game}: GameCardProps) => {
    return (
        <Card>
            <Image src={game.background_image}/>
            <CardBody>
                <HStack justifyContent={'space-between'} marginBottom={5}>
                    <PlatformIconList
                        platforms={game.parent_platforms.map((p) => p.platform)}
                    />
                    <CriticScore score={game.metacritic}/>
                </HStack>
                <Heading fontSize="2xl">{game.name}
                    <Emoij rating={game.rating_top}/>
                </Heading>
            </CardBody>
        </Card>
    );
};

export default GameCard;
