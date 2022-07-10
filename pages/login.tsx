import Image from "next/image";
import type { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import CommonLayout from "../components/layouts/CommonLayout";
import styles from "../styles/Login.module.css";
import landingImg from "../assets/img/landing.png";
import { getSession, signIn } from "next-auth/react";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Login() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.landing}>
        <div className={styles.landingDetails}>
          <h2 className={styles.landingTitle}>
            Playlist <br /> Personality
          </h2>
          <p className={styles.landingDescription}>
            Find your MBTI Character that match perfectly with your Spotify
            Activity
          </p>
        </div>
        <div className={styles.landingImage}>
          <Image src={landingImg} layout="fill" objectFit="contain" priority/>
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <button className={styles.cta} onClick={() => signIn('spotify', { callbackUrl: "/" })}>
          Sign in with Spotify{" "}
          <FontAwesomeIcon className={styles.brandIcon} icon={faSpotify} />
        </button>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
