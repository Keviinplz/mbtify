import type { ReactElement } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import CommonLayout from "../components/layouts/CommonLayout";
import { trpc } from "../utils/trpc";
import styles from "../styles/Home.module.css";
import Tracks from "../components/Tracks";

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

  const tracks = response.data.tracks;

  if (!tracks) {
    return <p>No tracks found</p>;
  }
  return (
    <div className={styles.mainView}>
      <div className={styles.tracksMenu}>
        <h1 className={styles.menuTitle}>Your Latest {tracks.length} tracks</h1>
        <p className={styles.menuDescription}>
          The tracks above are the latest tracks you have listened to on
          Spotify. <br />
          This will be use as a basis to get your MBTI Character.
        </p>
        <Tracks tracks={tracks} />
      </div>
      {/** <div className={styles.predictionMenu}>
        <h1 className={styles.menuTitle}>Your MBTI Character</h1>
        <p className={styles.menuDescription}>
          Based on your Spotify tracks, we have determined your MBTI Character.
        </p>
  </div> */}
    </div>
  );
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
