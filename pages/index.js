import fs from "fs";
import { join } from "path";
import { parseMarkdown, parseFrontMatter } from "../lib/markdownHandler";

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import _, { replace, groupBy } from "lodash";

export default function Home({ names, catsAndNames }) {
  return (
    <Layout catsAndNames={catsAndNames}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {parseMarkdown("# BRO")}
    </Layout>
  );
}

export async function getStaticProps() {
  const [posts, names] = getAllPosts();
  const catsAndNames = getAllCatsWithNames();
  return {
    props: {
      posts,
      names,
      catsAndNames,
    },
  };
}

function getAllPosts() {
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
