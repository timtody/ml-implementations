import Link from "next/link";
import _ from "lodash";
import Outline from "./Outline";
import { useState } from "react";

function listColor(name, active) {
  return name === active ? "text-gray-800 font-semibold" : "font-normal";
}

function maybeInsertTOC(name, active, toc) {
  return name === active ? <Outline toc={toc} /> : "";
}

function mapFilesToList(e, active, toc) {
  console.log("mapping file to list", e);
  return (
    <li key={e.Name} className="space-y-0 ">
      <div className={`text-sm ${listColor(e.Name, active)}`}>
        <Link href={`/${e.Name}`}>{e.Name}</Link>
      </div>
      {maybeInsertTOC(e.Name, active, toc)}
    </li>
  );
}

function renderSideBar(value, key, active, toc) {
  console.log(value);
  return (
    <li className="pb-2" key={key}>
      <div className="text-gray-500 text-sm">{_.toUpper(key)}</div>
      <ul className="space-y-1 list-none list-inside pb-1 pt-1">
        {value.map((e) => mapFilesToList(e, active, toc))}
      </ul>
    </li>
  );
}

export default function Sidebar({
  categoriesAndPosts,
  className,
  active,
  toc,
}) {
  console.log(categoriesAndPosts);
  const [content, setContent] = useState(categoriesAndPosts);
  return (
    <>
      <input
        className="rounded border mt-16 mb-4 h-10 z-50 bg-white px-2 text-xs text-gray-500"
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          if (value === "") {
            setContent(categoriesAndPosts);
          } else {
            // Dynamically load fuse.js
            const Fuse = (await import("fuse.js")).default;
            const fuse = new Fuse(categoriesAndPosts);
            setContent(fuse.search(value));
          }
        }}
      />
      {_.map(content, (value, key) => renderSideBar(value, key, active, toc))}
      <ul className={`space-y-2 ${className}`}>{}</ul>
    </>
  );
}
