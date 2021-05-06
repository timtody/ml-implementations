import React from "react";
import unified from "unified";
import parse from "remark-parse";
//import remark2react from "remark-react";
import math from "remark-math";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import rehype2react from "rehype-react";

import { H1, H2, H3 } from "../components/headings";
import { P } from "../components/paragraph";

export function parseMarkdown(markdown) {
  return unified()
    .use(parse)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(rehype2react, {
      createElement: React.createElement,
      components: { h1: H1, h2: H2, h3: H3, p: P },
    })
    .processSync(markdown).result;
}
