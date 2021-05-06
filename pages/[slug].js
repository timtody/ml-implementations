import { join } from "path";
import { replace } from "lodash";
import fs from "fs";
import { zipObject } from "lodash";

import Layout from "../components/layout";
import { parseMarkdown, parseFrontMatter } from "../lib/markdownHandler";

export default function Page({ content, names }) {
  return (
    // TODO: let the layout get its own props...
    <Layout names={names}>
      <div>{parseMarkdown(content.content)}</div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const [contents, names] = getAllPostsAndNames();
  //const posts = zipObject(names, contents);

  var posts = {};
  for (var i = 0; i < contents.length; i++) {
    const content = contents[i];
    posts[names[i]] = {
      content,
      ...parseFrontMatter(content),
    };
  }
  return {
    props: { content: posts[context.params.slug], names },
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
