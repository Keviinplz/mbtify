import styles from "./Tracks.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

interface Track {
  id: string;
  name: string;
  artists: string[];
  images: {
    url: string;
    width?: number;
    height?: number;
  }[];
  url: string;
}

interface TracksProps {
  tracks: Track[];
}

const Tracks = ({ tracks }: TracksProps) => {
  return (
    <ul className={styles.tracksList}>
      {tracks?.map((track) => (
        <li key={track.id}>
          <a href={track.url} target="_blank" className={styles.trackLink}>
            <div className={styles.trackInfo}>
              <div className={styles.trackImage}>
                <Image
                  src={track.images[0].url}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.trackDetails}>
                <span className={styles.trackTitle}>{track.name}</span>
                <span className={styles.trackArtists}>
                  {track.artists.join(", ")}
                </span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tracks;
