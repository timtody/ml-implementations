import fs from "fs";
import { join } from "path";
import _, { replace, groupBy } from "lodash";
import { parseFrontMatter } from "../lib/markdownHandler";

export function getAllPostsAndNames() {}

export function loadIndex() {
  const source = fs.readFileSync(
    join(process.cwd(), "_pages", "_index.md"),
    "utf8"
  );
  return source;
}

export function getAllPosts() {
  const postsDir = join(process.cwd(), "_pages");
  const postsHandles = fs.readdirSync(postsDir);
  const posts = postsHandles.map((post) =>
    fs.readFileSync(join(postsDir, post), "utf-8")
  );
  return [posts, postsHandles.map((handle) => replace(handle, ".md", ""))];
}

export function getAllCatsWithNames() {
  const postDir = join(process.cwd(), "_pages");
  const postHandles = fs.readdirSync(postDir);
  const posts = postHandles.map((handle) => {
    const post = fs.readFileSync(join(postDir, handle), "utf-8");
    return {
      Category: parseFrontMatter(post)?.Category,
      Name: replace(handle, ".md", ""),
    };
  });
  const cats = groupBy(posts, (value) => {
    return value.Category;
  });
  return cats;
}
