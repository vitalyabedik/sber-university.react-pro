import { useRef, useState } from "react";
import styles from "./RefExamples.module.css";

const DEBOUNCE_DELAY = 1000;

export const DebouncedLogger = () => {
  const [value, setValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log(`DebouncedLogger: ${nextValue}`);
    }, DEBOUNCE_DELAY);
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>DebouncedLogger</h3>
      <p className={styles.hint}>Текст попадёт в консоль через 1 секунду после остановки ввода</p>
      <label className={styles.label} htmlFor="debounced-input">
        Введите текст
      </label>
      <input
        id="debounced-input"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Печатайте — лог появится с задержкой"
      />
    </section>
  );
};
