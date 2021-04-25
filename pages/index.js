import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am a bobi-loving human and I love my bobi. Kisses!</p>
      </section>
      <Link href="/posts/first-post">
        <a>First Post!</a>
      </Link>
    </Layout>
  );
}
