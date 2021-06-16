import Head from "next/head";
import Link from "next/link";

import SideBar from "./sidebar";
import Outline from "./outline";

export const siteTitle = "ML Gloss";

export function _Layout({ children, catsAndNames, toc }) {
  return (
    <div className="min-h-full px-2 md:container md:mx-auto md:px-2 dark:bg-gray-800">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="ML Implementations" content="Baseline ML models" />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <div className="sticky top-0 z-50 flex flex-row bg-white dark:bg-gray-800 lg:h-16">
        <div className="inline-flex items-center mt-2 text-3xl dark:bg-gray-800 lg:w-64">
          <Link href="/">
            <a className="align-middle dark:text-gray-200">ML Gloss</a>
          </Link>
        </div>
        <div className="flex h-full w-full justify-between lg:px-24">
          <input
            className="w-full dark:bg-gray-500 dark:text-gray-200 dark:border-indigo-400
            rounded"
            defaultValue={`Quick search for anything...`}
          />
          <div className="inline-flex items-center border-b dark:border-indigo-400">
            <a className="dark:text-gray-200">GitHub</a>
          </div>
        </div>
      </div>
      <div className="justify-between min-h-full md:flex">
        <SideBar
          catsAndNames={catsAndNames}
          className="sticky top-0 h-screen mt-2 overflow-y-scroll lg:w-72"
        />
        <div className="flex h-full">
          <div className="container z-40 flex-1 h-full pt-10 lg:px-24">
            {children}
          </div>
          <div className="min-h-full">
            <Outline
              className="sticky flex flex-col pt-10 top-16 lg:w-60"
              toc={toc}
            />
          </div>
        </div>
      </div>
      {/*
       */}
    </div>
  );
}

export function __Layout({ children, catsAndNames, toc }) {
  return (
    <div className="lg:p-8">
      {/* Header */}
      <div className="flex justify-between h-12 mb-4 dark:text-gray-500 text-3xl">
        <Link href="/">
          <a className="lg:w-1/5">ML Gloss</a>
        </Link>

        <input
          type="text"
          className="w-full h-full rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-500 p-2 lg:w-2/5"
          defaultValue={`Search for stuff yo...`}
          onClick={() => console.log("Bruh")}
        />

        <a
          href="https://github.com/timtody/ml-implementations"
          target="_blank"
          className="lg:w-1/5 text-gray-500 text-3xl"
        >
          GitHub
        </a>
      </div>
      {/* Body */}
      <div className="flex justify-between mb-8">
        <SideBar
          catsAndNames={catsAndNames}
          className="lg:w-1/5 rounded dark:bg-gray-700 dark:text-gray-500 p-2"
        />

        {/* Content */}
        <div className="lg:w-2/5">{children}</div>

        <Outline
          toc={toc}
          className="lg:w-1/5 rounded dark:bg-gray-700 dark:text-gray-500 p-2"
        />
      </div>
    </div>
  );
}

export function ___Layout({ children, catsAndNames, toc }) {
  return (
    <div className="flex flex-row justify-between">
      {/* Left Sidebar*/}
      <div className="sticky top-0 lg:w-1/5 flex flex-col h-screen">
        <Link href="/">
          <a className="mx-8 my-4 text-4xl">ML Gloss</a>
        </Link>

        <input
          type="text"
          className="rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-gray-500 p-2 mx-8"
          defaultValue={`Search for stuff yo...`}
          onClick={() => console.log("Bruh")}
        />
        <hr class="border-0 bg-gray-500 text-gray-500 h-px mx-8 my-4" />

        <SideBar
          catsAndNames={catsAndNames}
          className="dark:bg-gray-700 dark:text-gray-500 p-2 mx-8 overflow-scroll"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center sticky top-0 h-10 bg-white border-b border-t z-50">
          Home > Autoencoders > b-VAE
        </div>

        <div className="flex flex-row">
          <div className="w-96 mx-auto py-12">{children}</div>

          {/* Right Sidebar */}
          <div className="sticky top-12 pt-12 lg:w-1/5 flex flex-col h-screen">
            <Outline
              toc={toc}
              className="dark:bg-gray-700 dark:text-gray-500 p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children, catsAndNames, toc }) {
  return (
    <div className="bg-pink-500">
      <div className="container mx-auto flex flex-row justify-center">
        <div className="sticky top-0 flex flex-col pr-4 h-screen">
          <input
            type="text"
            className="rounded border mt-16 mb-4 h-10 z-50 bg-white px-2"
            defaultValue={`Search for stuff yo...`}
          />
          <SideBar
            catsAndNames={catsAndNames}
            className="w-64 h-screen overflow-scroll pb-8"
          />
        </div>
        <div className="w-96 mt-16 overflow-scroll">{children}</div>
      </div>
      <div className="fixed top-0 w-full h-10 bg-white border-b border-t z-50">
        <div className="container mx-auto flex flex-row items-center justify-center pr-4">
          <Link href="/">
            <a className="text-3xl w-64">ML Gloss</a>
          </Link>
          <div className="w-96 pl-4">Home > Autoencoders > b-VAE</div>
        </div>
      </div>
    </div>
  );
}
