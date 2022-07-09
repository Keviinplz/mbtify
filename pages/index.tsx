import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MBTIfy App</title>
        <meta
          name="description"
          content="Get your mbti profile according to your Spotify Playlist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar user={{ username: "Keviinplz", picture: "yes" }} />
      </main>
      <footer>
        <span>
          Made with &hearts; by <a href="https://keviinplz.me">_keviinplz</a>
        </span>
      </footer>
    </div>
  );
};

export default Home;
