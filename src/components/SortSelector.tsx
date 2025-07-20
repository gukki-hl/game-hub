import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />} marginX="10">
        Order by:Relevance
      </MenuButton>
      <MenuList>
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Data added</MenuItem>
        <MenuItem>Name</MenuItem>
        <MenuItem>Release</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
