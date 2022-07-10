import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <span>
        Made with &hearts; by <a href="https://keviinplz.me">_keviinplz</a>
      </span>
    </footer>
  );
}
