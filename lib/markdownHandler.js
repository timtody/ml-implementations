import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

export function parseMarkdown(markdown) {
  return unified().use(parse).use(remark2react).processSync(markdown).result;
}

export function getAllPosts() {
  return {
    post1: "#BRO",
    post2: "##DUDE",
  };
}
