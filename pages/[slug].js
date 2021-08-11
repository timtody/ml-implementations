import * as React from "react";
import { join } from "path";
import _, { filter, groupBy, replace } from "lodash";
import fs from "fs";

import { Layout } from "../components/Layout";
import { matter, parseFrontMatter, parseTOC } from "../lib/markdownHandler";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import prism from "@mapbox/rehype-prism";
import math from "remark-math";
import katex from "rehype-katex";

import { H1, H2, H3, H4 } from "../components/Heading";
import SimpleChart from "../components/SimpleChart";
import References from "../components/References";

import ArticleHeader from "../components/ArticleHeader";
import Cite from "../components/Cite";

export default function Page({
  content,
  categoriesAndPosts,
  slug,
  tags,
  source,
  bib,
}) {
  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    Cite: (props) => (
      <Cite {...props} bib={bib} referenceContainer={References} />
    ),
    References: () => <References bib={bib} />,
    SimpleChart,
  };

  return (
    <Layout
      categoriesAndPosts={categoriesAndPosts}
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
        <MDXRemote {...source} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const [contents, names] = getAllPostsAndNames();
  const categoriesAndPosts = getAllCatsWithNames();

  let posts = {};
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    posts[names[i]] = {
      content,
      ...parseFrontMatter(content),
    };
  }

  const [frontmatter, source] = matter(posts[context.params.slug].content);
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [math],
      rehypePlugins: [prism, katex],
    },
  });

  // Band aid fix. What behaviour do we want if there are not tags defined?
  const tags = frontmatter.Tags ? frontmatter.Tags : [];

  return {
    props: {
      content: posts[context.params.slug],
      categoriesAndPosts,
      slug: context.params.slug,
      tags,
      source: mdxSource,
      bib: frontmatter.bib ? frontmatter.bib : null,
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
  let postsHandles = fs.readdirSync(postsDir);
  postsHandles = filter(postsHandles, (handle) => {
    return !handle.startsWith("_");
  });
  let posts = [];
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
  let posts = [];
  for (const handle of postHandles) {
    if (!handle.startsWith("_")) {
      posts.push({
        Category: parseFrontMatter(
          fs.readFileSync(join(postDir, handle), "utf-8")
        ).Category,
        Name: replace(handle, ".md", ""),
      });
    }
  }
  const grouped = groupBy(posts, (value) => {
    return value.Category;
  });
  let allPosts = [];
  for (const category in grouped) {
    allPosts.push({ category: category, posts: grouped[category] });
  }
  return allPosts;
}
