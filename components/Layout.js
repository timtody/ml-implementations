import Link from "next/link";

import SideBar from "./SideBar";

export const siteTitle = "ML Gloss";

export function Layout({ children, categoriesAndPosts, toc, slug }) {
  return (
    <div className="">
      <div className="container mx-auto flex flex-row justify-center">
        <div className="sticky top-0 flex flex-col pr-4 h-screen">
          <SideBar
            catsAndNames={categoriesAndPosts}
            className="w-64 h-screen overflow-scroll pb-8"
            active={slug}
            toc={toc}
          />
        </div>
        <div className="w-96 mt-16 overflow-scroll">{children}</div>
      </div>
      <div className="fixed top-0 w-full h-10 bg-white border-b border-t z-50">
        <div className="container mx-auto flex flex-row items-center justify-center pr-4">
          <Link href="/">
            <a className="text-3xl w-64 text-gray-700">ML Gloss</a>
          </Link>
          <div className="w-96 pl-4"> </div>
        </div>
      </div>
    </div>
  );
}
