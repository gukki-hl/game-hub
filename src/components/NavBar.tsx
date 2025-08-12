import {HStack, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";


const NavBar = () => {
    return (
        <>
            <HStack justifyContent='space-between'>
                <Link to={'/'} >
                <Image src={logo} boxSize="60px" objectFit='cover'></Image>
                </Link>
                <SearchInput/>
                <ColorModeSwitch/>
            </HStack>
        </>
    );
};

export default NavBar;