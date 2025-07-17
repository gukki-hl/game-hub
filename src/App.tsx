import { Grid, GridItem, Show } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"nav" "main"`, //
          lg: `"nav nav" "aside main"`, //1024px
        }}
      >
        <GridItem area={"nav"} bg={"coral"}>
          Nav
        </GridItem>
        <GridItem area={"aside"} bg={"gold"}>
          Aside
        </GridItem>

        <GridItem area={"main"} bg={"dodgerblue"}>
          Main
        </GridItem>
      </Grid>
    </div>
  );
};

export default App;
