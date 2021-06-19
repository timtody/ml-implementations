import { join } from "path";
import { groupBy, replace, filter, map } from "lodash";
import fs from "fs";
import moment from "moment";

import { Layout } from "../components/layout";
import Paper from "../components/paper";
import { Tag } from "../components/tag";
import {
  parseMarkdown,
  parseFrontMatter,
  parseTOC,
} from "../lib/markdownHandler";

export default function Page({ content, catsAndNames, slug, tags }) {
  return (
    // TODO: let the layout get its own props... (or not?)
    <Layout
      catsAndNames={catsAndNames}
      toc={parseTOC(content.content)}
      slug={slug}
    >
      <div className="flex flex-col pb-10">
        <div className="text-3xl">{slug}</div>
        <div className="flex space-x-4 text-gray-500 text-sm py-2 items-center">
          <div>{content?.Author}</div>
          <div>{moment(content?.Date).fromNow()}</div>
          <div className="flex flex-row space-x-2">
            {map(tags, (colour, tag) => (
              <Tag color={colour}>{tag}</Tag>
            ))}
          </div>
        </div>

        <hr className="my-4" />
        <div>{parseMarkdown(content.content)}</div>
        <hr className="mt-4 mb-0" />
        <div className="text-gray-400 text-sm mb-2">References</div>
        <div className="text-gray-500 space-y-2">
          <div>
            Papoudakis, G., Christianos, F., Rahman, A., & Albrecht, S. V.
            (2019). Dealing with non-stationarity in multi-agent deep
            reinforcement learning. arXiv preprint arXiv:1906.04737.
          </div>
          <div>
            Coman, A., Momennejad, I., Drach, R. D., & Geana, A. (2016).
            Mnemonic convergence in social networks: The emergent properties of
            cognition at a collective level. Proceedings of the National Academy
            of Sciences, 113(29), 8171-8176.
          </div>
          <div>
            Guilbeault, D., Becker, J., & Centola, D. (2018). Complex
            contagions: A decade in review. Complex spreading phenomena in
            social systems, 3-25.
          </div>
        </div>
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
      tags: { PyTorch: "red", TF: "yellow" },
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
