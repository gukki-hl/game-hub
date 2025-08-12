import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatofroms from "../hooks/usePlatofroms";
import useGameQeuryStore from "../store";


const PlatformSelector = () => {
    const {data, error} = usePlatform();
    const selectedPlatformId = useGameQeuryStore(s => s.gameQuery.platformId)
    const setSelectPlatformId = useGameQeuryStore(s => s.setPlatformId)
    const selectedPlatform = usePlatofroms(selectedPlatformId);
    if (error) return null;
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown/>} marginX="10">
                {selectedPlatform?.name || "Platforms"}
            </MenuButton>
            <MenuList>
                {data &&
                    data?.results.map((p: { id: number; name: string }) => (
                        <MenuItem
                            onClick={() => setSelectPlatformId(p.id)}
                            key={p.id}
                        >
                            {p.name}
                        </MenuItem>
                    ))}
            </MenuList>
        </Menu>
    );
};

export default PlatformSelector;
