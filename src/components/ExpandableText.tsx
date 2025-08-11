import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}
const ExpandableText = ({ children }: Props) => {
  const [expandaText, setExpandaText] = useState(false);
  const limit = 300;
  const summary = expandaText ? children : children.substring(0, limit) + "...";
  //判空
  if (!children) return null;
  //避免不必要的useState更新
  //先处理无需展开的情况，再处理需要展开的情况
  if (children.length <= limit) return <Text>{children}</Text>;
  return (
    <div>
      {summary}
      <Button
        colorScheme="yellow"
        size="xs"
        fontWeight="bold"
        onClick={() => setExpandaText(!expandaText)}
      >
        {expandaText ? "show less" : "show more"}
      </Button>
    </div>
  );
};

export default ExpandableText;
