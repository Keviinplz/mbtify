import { DefaultSession } from "next-auth";
import Image from "next/image";

import styles from "./styles.module.css";

interface NavbarProps {
  user: DefaultSession["user"];
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <ul className={styles.user}>
      <li className={styles.username}>{user?.name}</li>
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
    </ul>
  );
}
