import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

import { H1, H2, H3 } from "../components/headings";
import { P } from "../components/paragraph";

export function parseMarkdown(markdown) {
  return unified()
    .use(parse)
    .use(remark2react, {
      remarkReactComponents: { h1: H1, h2: H2, h3: H3, p: P },
    })
    .processSync(markdown).result;
}
