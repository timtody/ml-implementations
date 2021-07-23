import * as React from "react";
import { useState } from "react";
import { join } from "path";
import _, { groupBy, replace, filter } from "lodash";
import fs from "fs";

import { Layout } from "../components/layout";
import { parseFrontMatter, parseTOC, matter } from "../lib/markdownHandler";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import prism from "@mapbox/rehype-prism";
import math from "remark-math";
import katex from "rehype-katex";

import { H1, H2, H3, H4 } from "../components/headings";
import SimpleChart from "../components/simpleChart";
import References from "../components/References";

import ArticleHeader from "../components/ArticleHeader";

function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        className="bg-green-200 rounded border-green-500 p-1 hover:bg-green-600"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
      <p>You clicked {count} times</p>
    </div>
  );
}

const components = { Test, h1: H1, h2: H2, h3: H3, h4: H4, SimpleChart };

export default function Page({
  content,
  catsAndNames,
  slug,
  tags,
  source,
  bib,
}) {
  console.log(bib);

  function Cite({ key, text = false }) {
    console.log("bib and keyy", bib, key);
    return <>{bib[key]?.author}</>;
  }

  return (
    <Layout
      catsAndNames={catsAndNames}
      toc={parseTOC(content.content)}
      slug={slug}
    >
      <div className="flex flex-col pb-10">
        <ArticleHeader
          author={content.Author}
          slug={slug}
          date={content.Date}
          tags={tags}
        />
        <hr className="my-4" />
        <MDXRemote {...source} components={{ ...components, Cite }} />
        <References />
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

  const [frontmatter, source] = matter(posts[context.params.slug].content);
  console.log("BIB", frontmatter.bib);
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [math],
      rehypePlugins: [prism, katex],
    },
  });

  // Bandaid fix. What behaviour do we want if there are not tags defined?
  const tags = frontmatter.Tags ? frontmatter.Tags : [];

  return {
    props: {
      content: posts[context.params.slug],
      catsAndNames,
      slug: context.params.slug,
      tags,
      source: mdxSource,
      bib: frontmatter.bib,
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
    return value?.Category;
  });
  return cats;
}
