import {Button, Icon, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {BsChevronDown} from "react-icons/bs";
import useGameQeuryStore from "../store";

const SortSelector = () => {
    const sortOrders = [
        {value: "", label: "Relevance"},
        {value: "-added", label: "Data added"},
        {value: "name", label: "Name"},
        {value: "-released", label: "Release"},
        {value: "metacritic", label: "Popularity"},
        {value: "-rating", label: "Average rating"},
    ];
    const sortOrder = useGameQeuryStore(s => s.gameQuery.sortOrders);
    const selectSortOrders = useGameQeuryStore(s => s.setSortOrders)
    const currentSortOrder = sortOrders.find((sort) => sort.value === sortOrder);
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<Icon as={BsChevronDown as any}/>} marginX="10">
                Order by:{currentSortOrder?.label || "Relevance"}
            </MenuButton>
            <MenuList>
                {sortOrders &&
                    sortOrders.map((sort) => (
                        <MenuItem
                            key={sort.value}
                            value={sort.value}
                            onClick={() => selectSortOrders(sort.value)}
                        >
                            {sort.label}
                        </MenuItem>
                    ))}
            </MenuList>
        </Menu>
    );
};

export default SortSelector;
