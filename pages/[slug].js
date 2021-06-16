import { join } from "path";
import { groupBy, replace, filter } from "lodash";
import fs from "fs";

import { Layout } from "../components/layout";
import { Tag } from "../components/tag";
import {
  parseMarkdown,
  parseFrontMatter,
  parseTOC,
} from "../lib/markdownHandler";

export default function Page({ content, catsAndNames, slug }) {
  return (
    // TODO: let the layout get its own props... (or not?)
    <Layout catsAndNames={catsAndNames} toc={parseTOC(content.content)}>
      <div className="flex flex-col">
        <div className="text-3xl">{slug}</div>
        <div className="flex space-x-4 text-gray-500 text-sm py-2 items-center ">
          <div>Julius Taylor</div>
          <div>1 week ago</div>
          <div className="flex flex-row space-x-2">
            <Tag color="red">PyTorch</Tag>
            <Tag color="pink">CNN</Tag>
            <Tag color="blue">CV</Tag>
          </div>
        </div>
        <hr className="my-4" />
        <div>{parseMarkdown(content.content)}</div>
      </div>
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
    props: {
      content: posts[context.params.slug],
      catsAndNames,
      slug: context.params.slug,
    },
  };
}

export async function getStaticPaths() {
  const [_, names] = getAllPostsAndNames();
  const paths = names.map((name) => ({ params: { slug: name } }));
  return { paths, fallback: false };
}

function getAllPostsAndNames() {
  const postsDir = join(process.cwd(), "_pages");
  var postsHandles = fs.readdirSync(postsDir);
  postsHandles = filter(postsHandles, (handle) => {
    return !handle.startsWith("_");
  });
  var posts = [];
  for (const post of postsHandles) {
    if (!post.startsWith("_")) {
      posts.push(fs.readFileSync(join(postsDir, post), "utf-8"));
    }
  }
  return [posts, postsHandles.map((handle) => replace(handle, ".md", ""))];
}

function getAllCatsWithNames() {
  const postDir = join(process.cwd(), "_pages");
  const postHandles = fs.readdirSync(postDir);
  var posts = [];
  for (const handle of postHandles) {
    if (!handle.startsWith("_")) {
      posts.push({
        Category: parseFrontMatter(
          fs.readFileSync(join(postDir, handle), "utf-8")
        )?.Category,
        Name: replace(handle, ".md", ""),
      });
    }
  }
  const cats = groupBy(posts, (value) => {
    return value.Category;
  });
  return cats;
}
