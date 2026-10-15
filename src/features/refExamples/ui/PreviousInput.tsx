import { useEffect, useRef, useState } from "react";
import styles from "./RefExamples.module.css";

export const PreviousInput = () => {
  const [value, setValue] = useState("");
  const previousValueRef = useRef("");

  // eslint-disable-next-line react-hooks/refs
  const previousValue = previousValueRef.current;

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>PreviousInput</h3>
      <label className={styles.label} htmlFor="previous-input">
        Введите текст
      </label>
      <input
        id="previous-input"
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Начните печатать…"
      />
      <p className={styles.value}>
        Предыдущее значение: <strong>{previousValue || "—"}</strong>
      </p>
    </section>
  );
};
