import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import styles from "./Character.module.css";

interface CharacterProps {
  tracksIds: string[];
}

export default function Character({ tracksIds }: CharacterProps) {
  const [message, setMessage] = useState<string>("Getting tracks...");
  const [trackData, setTrackData] = useState<any>(null);

  const response = trpc.useQuery([
    "get-valence-by-tracks",
    { tracks: tracksIds },
  ]);

  useEffect(() => {
    if (!response.data) {
      setMessage("Obtaining features from your tracks...");
      return;
    }

    if (response.data.error && response.data.error === "Unauthorized") {
      signOut();
      setMessage("Your access token is not valid, please login again.");
      return;
    }

    if (!response.data.features) {
      setMessage("No tracks found");
      return;
    }

    setTrackData(response.data.features);
    setMessage("Getting MBTI type from your tracks features...");
    return;
  }, [response.data]);

  return (
    <div className={`${styles.working}`}>
      <FontAwesomeIcon icon={faAtom} className={`${styles.spinner} fa-spin`} />
      <span>{message}</span>
    </div>
  );
}
