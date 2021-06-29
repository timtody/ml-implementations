import {
  parseMarkdown,
  parseTOC,
} from "../lib/markdownHandler";

import Head from "next/head";
import { Layout, siteTitle } from "../components/layout";
import {
  getAllPosts,
  getAllCatsWithNames,
  loadIndex,
} from "../lib/contentLoaders";

export default function Home({ catsAndNames, indexSource }) {
  return (
    <Layout catsAndNames={catsAndNames} toc={parseTOC(indexSource)}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {parseMarkdown(indexSource)}
    </Layout>
  );
}

export async function getStaticProps() {
  const [posts, names] = getAllPosts();
  const catsAndNames = getAllCatsWithNames();
  const indexSource = loadIndex();
  return {
    props: {
      posts,
      names,
      catsAndNames,
      indexSource,
    },
  };
}
