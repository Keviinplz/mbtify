import type { ReactElement } from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import CommonLayout from "../components/layouts/CommonLayout";
import { trpc } from "../utils/trpc";
import styles from "../styles/Home.module.css";
import Tracks from "../components/Tracks";
import Character from "../components/Character";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Main() {
  const response = trpc.useQuery(["get-tracks", { limit: 5 }]);

  if (!response.data) {
    return <p>Loading...</p>;
  }

  if (response.data.error && response.data.error === "Unauthorized") {
    signOut();
    return <p>Your access token is not valid, please login again.</p>;
  }

  const tracks = response.data.tracks;

  if (!tracks) {
    return <p>No tracks found</p>;
  }

  return (
    <div className={styles.mainView}>
      <div className={styles.tracksMenu}>
        <h1 className={styles.menuTitle}>Tracks used</h1>
        <p className={styles.menuDescription}>
          The tracks above are the latest {tracks.length} tracks you have
          listened to on Spotify. <br />
          This will be use as a basis to get your MBTI Character.
        </p>
        <Tracks tracks={tracks} />
      </div>
      <div className={styles.predictionMenu}>
        <h1 className={styles.menuTitle}>Your MBTI Character</h1>
        <p className={styles.menuDescription}>
          In few seconds you will be able to see your MBTI Character above. 
        </p>
        <Character tracksIds={tracks.map((track) => track.id)}/>
      </div>
    </div>
  );
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
