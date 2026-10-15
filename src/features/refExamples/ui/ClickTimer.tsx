import { useRef } from "react";
import styles from "./RefExamples.module.css";

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();
    const data = clickDataRef.current;

    if (data.startTime === null) {
      data.startTime = now;
    }

    data.clickCount += 1;
    console.log(`Клик #${data.clickCount}: прошло ${now - data.startTime} мс с первого клика`);
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>ClickTimer</h3>
      <p className={styles.hint}>
        Клики и время считаются в useRef — компонент не перерисовывается
      </p>
      <button type="button" className={styles.button} onClick={handleClick}>
        Кликнуть
      </button>
    </section>
  );
};
