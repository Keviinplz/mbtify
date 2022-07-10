import { useSession } from "next-auth/react";

import Navbar from "../Navbar";
import styles from "./NavbarOutler.module.css";

export default function NavbarOutler() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>MBTIfy</h1>
      {session && <Navbar user={session?.user} />}
    </nav>
  );
}
