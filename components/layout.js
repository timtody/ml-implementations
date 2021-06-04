import Head from "next/head";
import Link from "next/link";

import SideBar from "./sidebar";
import Outline from "./outline";

export const siteTitle = "ML Gloss";

export default function Layout({ children, catsAndNames, toc }) {
  return (
    <div className="md:container md:mx-auto px-2 md:px-2 dark:bg-gray-700">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="ML Implementations" content="Baseline ML models" />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <div className="sticky top-0 z-50 flex flex-row w-full mx-auto bg-white dark:bg-gray-700 lg:h-16">
        <div className="inline-flex items-center mt-2 text-3xl dark:bg-gray-700 lg:w-auto lg:pr-10">
          <Link href="/">
            <a className="align-middle dark:text-indigo-50">ML Gloss</a>
          </Link>
        </div>
        <div className="container flex flex-1 mt-2 lg:pl-44">
          <input
            className="w-full h-full border-b dark:bg-gray-700 dark:text-indigo-200 dark:border-indigo-400 "
            defaultValue={`Quick search for anything...`}
          />
          <div className="inline-flex items-center border-b dark:border-indigo-400">
            <a className="dark:text-indigo-50">GitHub</a>
          </div>
        </div>
      </div>
      <div className="justify-between md:flex">
        <SideBar
          catsAndNames={catsAndNames}
          className="h-screen pt-2 mb-10 overflow-y-scroll lg:w-60"
        />
        <div className="container flex-1 h-screen pt-10 overflow-y-scroll lg:px-24">
          {children}
        </div>
        <Outline
          className="h-screen pt-10 overflow-y-scroll lg:w-60"
          toc={toc}
        />
      </div>
    </div>
  );
}
