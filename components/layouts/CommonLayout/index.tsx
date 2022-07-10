import NavbarOutler from "../../NavbarOutler";
import Footer from "../../Footer";
import Head from "next/head";

import styles from "./CommonLayout.module.css";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <Head>
        <title>MBTIfy App</title>
        <meta
          name="description"
          content="Get your mbti profile according to your Spotify Playlist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarOutler />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
}
