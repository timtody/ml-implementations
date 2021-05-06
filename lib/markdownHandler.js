import { createElement } from "react";
import unified from "unified";
import parse from "remark-parse";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import compiler from "remark-stringify";
import math from "remark-math";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import rehype2react from "rehype-react";
import toml from "toml";

import { H1, H2, H3 } from "../components/headings";
import { P } from "../components/paragraph";

export function parseFrontMatter(markdown) {
  const fm = unified()
    .use(parse)
    .use(compiler)
    .use(frontmatter, ["toml"])
    .use(extract, { name: "frontmatter", toml: toml.parse })
    .processSync(markdown);
  return fm.data.frontmatter;
}

export function parseMarkdown(markdown) {
  const content = unified()
    .use(parse)
    .use(frontmatter, ["toml"])
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(rehype2react, {
      createElement,
      components: { h1: H1, h2: H2, h3: H3, p: P },
    })
    .processSync(markdown);
  return content.result;
}
