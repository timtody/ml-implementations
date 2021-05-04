import Head from "next/head";
import Link from "next/link";

import SideBar from "./sidebar";
import Outline from "./outline";

export const siteTitle = "ML Gloss";

export default function Layout({ children, names }) {
  return (
    <div className="md:container md:mx-auto px-2 md:px-2 dark:bg-gray-700">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="ML Implementations" content="Baseline ML models" />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <div className="sticky top-0 w-full flex flex-row mx-auto bg-white dark:bg-gray-700 lg:h-16">
        <div className="text-3xl dark:bg-gray-700 lg:w-60 mt-2">
          <Link href="/">
            <a className="dark:text-indigo-50 align-middle">ML Gloss</a>
          </Link>
        </div>
        <div className="flex container lg:px-24 flex-1 mt-2">
          <input
            className="dark:bg-gray-700 dark:text-indigo-200 w-full h-full border-b border-indigo-400 "
            value={`Quick search for anything...`}
          />
          <div className="inline-flex items-center border-b border-indigo-400">
            <a className="dark:text-indigo-50">GitHub</a>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between">
        <SideBar className="lg:w-60 pt-10 mb-10 h-screen overflow-y-scroll">
          {names}
        </SideBar>
        <div className="flex-1 container lg:px-24 pt-10 h-screen overflow-y-scroll">
          {children}
        </div>
        <Outline className="lg:w-60 pt-10 h-screen overflow-y-scroll" />
      </div>
    </div>
  );
}
