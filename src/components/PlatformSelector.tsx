import {Button, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {BsChevronDown} from "react-icons/bs";
import usePlatform, {Platforms} from "../hooks/usePlatform";
import React from "react";
import usePlatofroms from "../hooks/usePlatofroms";

interface onSelectPlatform {
    onSelectPlatform: (platform: Platforms) => void;
    selectedPlatformId?: number;
}

const PlatformSelector = ({
                              onSelectPlatform,
                              selectedPlatformId,
                          }: onSelectPlatform) => {
    const {data, error} = usePlatform();
    const selectedPlatform = usePlatofroms(selectedPlatformId)
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
                            onClick={() => onSelectPlatform(p as Platforms)}
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
