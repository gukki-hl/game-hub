import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { platform } from "../hooks/useGame";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface PlatformIconListProps {
  platforms: platform[];
}

const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  //使用一个对象来映射平台slug到对应的图标组件
    const iconMap: { [key: string]:IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    ios: MdPhoneIphone,
    android: FaAndroid,
    mac: FaApple,
    linux: FaLinux,
    web: BsGlobe,
  };

  return (
    <HStack marginY={1}>
        //遍历平台数组，使用映射对象获取对应的图标组件
      {platforms.map((p) => (
        <Icon as={iconMap[p.slug]} color='gray.500' />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
