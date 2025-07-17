import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/react.svg";
import { BiLogoFlask } from "react-icons/bi";

const NavBar = () => {
  return (
    <div>
      <HStack>
        <Image src={logo} boxSize="60px"></Image>
        <Text>NavBar</Text>
      </HStack>
    </div>
  );
};

export default NavBar;
