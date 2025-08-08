import {
    Button,
    Heading,
    HStack,
    Image,
    List,
    ListItem,
    Spinner,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppenedImageUrl from "../tool/image-url";
import useGameQeuryStore from "../store";


const GenreList = () => {
    const {data, isLoading, error} = useGenres();
    const selectGenreId = useGameQeuryStore(s => s.gameQuery.genreId)
    const setSelectGenreId = useGameQeuryStore(s => s.setGenreId)
    if (error) return null;
    if (isLoading) return <Spinner/>;
    return (
        <>
            <Heading fontSize="2xl" marginBottom="10px">
                Genres
            </Heading>
            <List>
                {data?.results.map((genre) => (
                    <ListItem key={genre.id} paddingY="5px">
                        <HStack>
                            <Image
                                boxSize="32px"
                                borderRadius={8}
                                objectFit="cover"
                                src={getCroppenedImageUrl(genre.image_background)}
                            />
                            <Button
                                whiteSpace="normal"
                                textAlign="left"
                                fontSize="lg"
                                variant="link"
                                fontWeight={genre.id === selectGenreId ? "bold" : "normal"}
                                onClick={() => setSelectGenreId(genre.id)}
                            >
                                {genre.name}
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default GenreList;
