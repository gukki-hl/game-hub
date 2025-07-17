import { HStack, Image, Text } from "@chakra-ui/react";
import logo1 from "../assets/logo1.png";

const NavBar = () => {
  return (
    <>
      <HStack>
        <Image src={logo1} boxSize="60px"></Image>
        <Text>NavBar</Text>
      </HStack>
    </>
  );
};

export default NavBar;
