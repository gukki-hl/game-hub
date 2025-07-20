import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import { Genre } from "./hooks/useGenres";
import { Platforms } from "./hooks/usePlatform";
import PlatformSelector from "./components/PlatformSelector";

const App = () => {
  // 使用状态来管理选中的游戏类型
  // 这里可以根据需要进行初始化，比如从URL参数获取,或者从本地存储中获取
  // 这里暂时设置为null，表示没有选中的游戏类型
  // 如果需要在应用中使用选中的游戏类型，可以通过props传递给其他组件
  // 例如，可以在GenreList组件中使用setSelectedGenre来更新选中的游戏类型
  // 这样可以在GenreList中点击某个游戏类型时更新选中的游戏类型
  // 也可以在GameGrid组件中使用selectedGenre来过滤游戏列表
  // 这样可以根据选中的游戏类型来显示对应的游戏列表
  // 这里的selectedGenre可以是null表示没有选中任何游戏类型
  // 也可以是一个Genre对象表示选中的游戏类型
  // 例如，如果选中的是一个动作游戏类型，那么selectedGenre可以是一个包含id和name的Genre对象
  // 这样可以在GameGrid中根据selectedGenre来过滤游戏列表
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms | null>(
    null
  );

  useEffect(() => {
    console.log("Selected Genre:", selectedPlatform);
  }, [selectedPlatform?.name]);

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
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area={"aside"} paddingX={5}>
            <GenreList
              onSelectGenre={(genre) => setSelectedGenre(genre)}
              selectedGenre={selectedGenre}
            />
          </GridItem>
        </Show>
        <GridItem area={"main"}>
          <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={(platform) =>setSelectedPlatform(platform)  }/>
          <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} />
        </GridItem>
      </Grid>
    </div>
  );
};

export default App;
