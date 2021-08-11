import { nanoid } from "nanoid";
import _ from "lodash";
import { Tag } from "./Tag";
import tagColors from "../lib/tagColors";
import MyPopover from "./Popover";

function renderTags(tags) {
  return tags.map((tag) => {
    return (
      <Tag key={nanoid()} color={tag[1]}>
        {tag[0]}
      </Tag>
    );
  });
}

function mapTagsListToColours(tagList) {
  let tags = _.map(_.split(tagList, ","), _.trim);
  return tags.map((tag) => {
    return [tag, tagColors[tag] ? tagColors[tag] : "gray"];
  });
}

export default function TagPane({ tags, visibleTags = 3 }) {
  let tagsWithColors = mapTagsListToColours(tags);
  let colorTags = tagsWithColors.filter(([_, color]) => color !== "gray");
  let grayTags = tagsWithColors.filter(([_, color]) => color === "gray");
  let allTags = colorTags.concat(grayTags);
  let displayTags = allTags.slice(0, visibleTags);

  return (
    <>
      {renderTags(displayTags)}
      <MyPopover
        content={renderTags(allTags)}
        buttonText={
          <Tag color="gray">{`+${allTags.length - visibleTags}`}</Tag>
        }
      />
    </>
  );
}
