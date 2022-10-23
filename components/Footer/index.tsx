import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <span>
        Made with <span className={styles.heart}>&hearts;</span> by{" "}
        <a href="https://keviinplz.me" className={styles.page}>
          _keviinplz
        </a>
      </span>
    </footer>
  );
}
