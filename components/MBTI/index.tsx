import { klassMapping } from "../../ai/mapping";
import styles from "./MBTI.module.css";

export default function MBTICharacter({
  klass,
}: {
  klass: keyof typeof klassMapping;
}) {
  const klassName = klassMapping[klass];
  return (
    <div className={styles.mbtiContainer}>
      <div className={styles.mbtiSvg}>
        <img
          src={`/characters/${klassName.toLowerCase()}.svg`}
          alt={klassName}
        />
      </div>
      <div className={styles.mbtiDescription}>
        <div className={styles.mbtiKlass}>{klassName}</div>
        <div className={styles.mbtiInformation}>
          <a
            href={`https://www.16personalities.com/${klassName.toLowerCase()}-personality`}
            target={"_blank"}
          >
            What is an {klassName}?
          </a>
        </div>
      </div>
    </div>
  );
}
