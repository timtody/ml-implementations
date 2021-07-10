import { useState } from "react";
import { Tag } from "../components/tag";
import PopOver from "./Popover";

export function OverflowTag({ children, allTags }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Tag
        className=""
        color="gray"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {`+${children.length}`}
      </Tag>
      <PopOver visible={visible} content={allTags}>
        {allTags}
      </PopOver>
    </>
  );
}
