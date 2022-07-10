import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.css";

interface NavbarProps {
  user: DefaultSession["user"];
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <ul className={styles.user}>
      {user?.image && (
        <li>
          <Image
            className={styles.picture}
            src={user.image}
            width={50}
            height={50}
          />
        </li>
      )}
      <li className={styles.signOut}>
        <button className={styles.signOutButton} onClick={() => signOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </li>
    </ul>
  );
}
