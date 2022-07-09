import styles from "./Navbar.module.css";

interface NavbarProps {
  user: SpotifyUser | null;
}

interface SpotifyUser {
  username: string;
  picture?: string;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MBTIfy</div>
      <ul className={styles.user}>
        <li>{user?.picture ? "has picture" : "not picture"}</li>
        <li>{user?.username}</li>
      </ul>
    </nav>
  );
}
