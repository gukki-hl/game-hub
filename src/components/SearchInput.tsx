import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef } from "react";
import useGameQeuryStore from "../store";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const setSearchText = useGameQeuryStore((s) => s.setSearchText);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();//获取当前路由跳转的加载状态
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<Icon as={BsSearch as any} />} />
        <Input ref={ref} borderRadius={20} placeholder="Search games"></Input>
      </InputGroup>
    </form>
  );
};
export default SearchInput;
