import { signIn, useSession } from "next-auth/react";
import Navbar from "../Navbar";
import styles from "./styles.module.css";

export default function NavbarOutler() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MBTIfy</div>
      {session ? (
        <Navbar user={session?.user} />
      ) : (
        <div>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
    </nav>
  );
}
