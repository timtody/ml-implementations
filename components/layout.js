import Head from "next/head";
import SideBar from "./sidebar";
import Content from "./content";

export const siteTitle = "ML Gloss";

export default function Layout({ children }) {
  return (
    <div className="md:container mx-auto px-2 md:px-">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="ML Implementations" content="Baseline ML models" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className="sticky top-0 w-full flex flex-row mx-auto bg-white">
        <div className="text-3xl">ML Gloss</div>
        <input className="border border-indigo-600 rounded-md w-full"></input>
      </header>
      <div className="lg:flex">
        <SideBar />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
