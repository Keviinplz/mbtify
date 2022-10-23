import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import MBTICharacter from "../MBTI";
import styles from "./Character.module.css";

interface CharacterProps {
  tracksIds: string[];
}

const WorkingMessage = ({ message }: { message: string }) => {
  return (
    <div className={`${styles.working}`}>
      <FontAwesomeIcon icon={faAtom} className={`${styles.spinner} fa-spin`} />
      <span>{message}</span>
    </div>
  );
};

export default function Character({ tracksIds }: CharacterProps) {
  const response = trpc.useQuery(["process-tracks", { tracks: tracksIds }]);

  if (!response.data) {
    return <WorkingMessage message={"Loading..."} />;
  }

  if (response.data.error && response.data.error === "Unauthorized") {
    signOut();
    return (
      <WorkingMessage
        message={"Your access token is not valid, please login again."}
      />
    );
  }

  if (response.data.klass == null) {
    return <p> There was an error obtaining your MBTI Character </p>;
  }

  return <MBTICharacter klass={response.data.klass} />;
}
