import _ from "lodash";
import { useState } from "react";
import { Tag } from "../components/tag";
import tagColors from "../lib/tagColors";
import { OverflowTag } from "./OverflowTag";
import MyPopover from "../components/popover";

function renderTags(tags) {
  return tags.map((tag) => {
    return (
      <Tag key={tag[0]} color={tag[1]}>
        {tag[0]}
      </Tag>
    );
  });
}

function mapTagsListToColours(taglist) {
  let tags = _.map(_.split(taglist, ","), _.trim);
  let tagsWithColors = tags.map((tag) => {
    return [tag, tagColors[tag] ? tagColors[tag] : "gray"];
  });
  return tagsWithColors;
}

export default function TagPane({ tags, visibleTags = 3 }) {
  let tagsWithColors = mapTagsListToColours(tags);
  let colorTags = tagsWithColors.filter((e) => e[1] !== "gray");
  let grayTags = tagsWithColors.filter((e) => e[1] === "gray");
  let allTags = colorTags.concat(grayTags);
  let tagComponentList = renderTags(allTags);

  let dt = tagComponentList.splice(0, visibleTags);
  const [displayTags, setDisplayTags] = useState(dt);
  const [hiddenTags, setHiddenTags] = useState(tagComponentList);
  const allTagsCopy = dt.concat(hiddenTags);

  return (
    <>
      {displayTags}
      <MyPopover
        content={allTagsCopy}
        buttonText={
          <Tag color="gray" onClick={() => {}}>
            {`+${hiddenTags.length}`}
          </Tag>
        }
      />
    </>
  );
}
