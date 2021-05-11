import { join } from "path";
import { groupBy, replace } from "lodash";
import fs from "fs";

import Layout from "../components/layout";
import {
  parseMarkdown,
  parseFrontMatter,
  parseTOC,
} from "../lib/markdownHandler";

export default function Page({ content, catsAndNames }) {
  return (
    // TODO: let the layout get its own props...
    <Layout catsAndNames={catsAndNames} toc={parseTOC(content.content)}>
      <div>{parseMarkdown(content.content)}</div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const [contents, names] = getAllPostsAndNames();
  const catsAndNames = getAllCatsWithNames();

  var posts = {};
  for (var i = 0; i < contents.length; i++) {
    const content = contents[i];
    posts[names[i]] = {
      content,
      ...parseFrontMatter(content),
    };
  }
  return {
    props: { content: posts[context.params.slug], catsAndNames },
  };
}

export async function getStaticPaths() {
  const [_, names] = getAllPostsAndNames();
  const paths = names.map((name) => ({ params: { slug: name } }));
  return { paths, fallback: false };
}

function getAllPostsAndNames() {
  const postsDir = join(process.cwd(), "_pages");
  const postsHandles = fs.readdirSync(postsDir);
  const posts = postsHandles.map((post) =>
    fs.readFileSync(join(postsDir, post), "utf-8")
  );
  return [posts, postsHandles.map((handle) => replace(handle, ".md", ""))];
}

function getAllCatsWithNames() {
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
