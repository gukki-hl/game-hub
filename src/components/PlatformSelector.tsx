import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";

const PlatformSelector = () => {
  const { data, error } = usePlatform();

  if (error) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Actions
      </MenuButton>
      <MenuList>
        {data &&
          data.map((p: { id: number; name: string }) => (
            <MenuItem key={p.id}>{p.name}</MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
