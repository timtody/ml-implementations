import fs from "fs";
import { join } from "path";

import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import _, { replace } from "lodash";
import { parseMarkdown } from "../lib/markdownHandler";

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href="/posts/first-post">
        <a>First Post!</a>
      </Link>
      {parseMarkdown("## BRAH\n*DUDE*")}
      <ul>
        {_.map(posts, (post, key) => {
          return (
            <div className="border-4 border-indigo-600">
              {parseMarkdown(post)}
            </div>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const [posts, names] = getAllPosts();
  return {
    props: {
      posts,
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
