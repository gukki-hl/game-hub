import { Grid, Show, GridItem, HStack, Box, Button } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";
import * as Sentry from "@sentry/react";
const HomePage = () => {
  // 测试 Sentry 错误捕获
  const testSentryError = () => {
    alert("About to throw a test error for Sentry!");
    throw new Error("This is a test error for Sentry!");
  };

  // 测试自定义事件
  const testSentryEvent = () => {
    Sentry.captureMessage("Test event from Game Hub", "info");
  };

  return (
    <>
      {/* <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`, //1024px
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area={"aside"} paddingX={5}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area={"main"}>
          <GameHeading />
          <Box marginTop={5}>
            <HStack spacing={-4}>
              <PlatformSelector />
              <SortSelector />
            </HStack>
          </Box>
          <GameGrid />
        </GridItem>
      </Grid> */}

      {/* Sentry 测试按钮（仅开发环境显示） */}
      {import.meta.env.DEV && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
          <Button onClick={testSentryEvent} style={{ marginRight: 10 }}>
            Test Sentry Event
          </Button>
          <Button onClick={testSentryError}>Test Sentry Error</Button>
        </div>
      )}
    </>
  );
};

export default HomePage;
