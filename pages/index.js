import fs from "fs";
import { join } from "path";
import { parseMarkdown } from "../lib/markdownHandler";

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import _, { replace } from "lodash";
import SideBar from "../components/sidebar";

export default function Home({ names }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <SideBar>{names}</SideBar>
      {parseMarkdown("# BRO")}
    </Layout>
  );
}

export async function getStaticProps() {
  const [posts, names] = getAllPosts();
  return {
    props: {
      posts,
      names,
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
