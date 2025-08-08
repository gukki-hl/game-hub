import {Grid, GridItem, Show, HStack, Box} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";


const App = () => {
    return (
        <div>
            <Grid
                templateAreas={{
                    base: `"nav" "main"`,
                    lg: `"nav nav" "aside main"`, //1024px
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "200px 1fr",
                }}
            >
                <GridItem area={"nav"} marginBottom="5">
                    <NavBar/>
                </GridItem>
                <Show above="lg">
                    <GridItem area={"aside"} paddingX={5}>
                        <GenreList/>
                    </GridItem>
                </Show>
                <GridItem area={"main"}>
                    <GameHeading/>
                    <Box marginTop={5}>
                        <HStack spacing={-4}>
                            <PlatformSelector
                            />
                            <SortSelector/>
                        </HStack>
                    </Box>
                    <GameGrid/>
                </GridItem>
            </Grid>
        </div>
    );
};

export default App;
