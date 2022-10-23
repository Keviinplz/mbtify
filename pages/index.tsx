import type { ReactElement } from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import CommonLayout from "../components/layouts/CommonLayout";
import { trpc } from "../utils/trpc";
import styles from "../styles/Home.module.css";
import Tracks from "../components/Tracks";
import Character from "../components/Character";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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
    return (
      <div className={styles.mainView} style={{ alignItems: "center" }}>
        <Loader />
      </div>
    );
  }

  if (response.data.error && response.data.error === "Unauthorized") {
    signOut();
    return (
      <div className={styles.working} style={{ alignItems: "center" }}>
        <FontAwesomeIcon icon={faCircleXmark} className={`${styles.icon}`} />
        <span>Your access token is not valid, please login again.</span>
      </div>
    );
  }

  if (response.data.tracks == null) {
    return (
      <div className={styles.working} style={{ alignItems: "center" }}>
        <FontAwesomeIcon icon={faCircleXmark} className={`${styles.icon}`} />
        <span>No tracks found.</span>
      </div>
    );
  }

  const tracks = response.data.tracks;

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
        <Character tracksIds={tracks.map((track) => track.id)} />
      </div>
    </div>
  );
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
