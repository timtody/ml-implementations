import { Tag } from "./Tag";

export function OverflowTag({ children, allTags, onClick }) {
  if (children.length === 0) {
    return "";
  }
  return (
    <>
      <Tag color="gray" onClick={onClick}>
        {`+${children.length}`}
      </Tag>
    </>
  );
}
