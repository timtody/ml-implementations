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
      <header className="sticky top-0 w-full flex flex-row mx-auto bg-white dark:bg-gray-700">
        <div className="text-3xl dark:bg-gray-700">
          <Link href="/">
            <a className="dark:text-indigo-50">ML Gloss</a>
          </Link>
        </div>
        <input className="border border-indigo-600 rounded-md w-full dark:bg-gray-700"></input>
      </header>
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
