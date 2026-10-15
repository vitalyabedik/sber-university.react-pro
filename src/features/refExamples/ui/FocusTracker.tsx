import { useRef } from "react";
import styles from "./RefExamples.module.css";

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const transitionCountRef = useRef(0);

  const focusFirstInput = () => {
    firstInputRef.current?.focus();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // relatedTarget пуст при первичном фокусе — считаем только переходы между полями
    if (!event.relatedTarget) return;

    transitionCountRef.current += 1;
    console.log(`Переходов фокуса: ${transitionCountRef.current}`);
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>FocusTracker</h3>
      <p className={styles.hint}>Переходы фокуса считаются в useRef и логируются в консоль</p>
      <label className={styles.label} htmlFor="focus-first">
        Первое поле
      </label>
      <input
        id="focus-first"
        ref={firstInputRef}
        className={styles.input}
        onFocusCapture={handleFocus}
        placeholder="Первое поле"
      />
      <label className={styles.label} htmlFor="focus-second">
        Второе поле
      </label>
      <input
        id="focus-second"
        ref={secondInputRef}
        className={styles.input}
        onFocusCapture={handleFocus}
        placeholder="Второе поле"
      />
      <button
        type="button"
        className={`${styles.button} ${styles.buttonSecondary}`}
        onClick={focusFirstInput}
      >
        Сфокусировать на первом
      </button>
    </section>
  );
};
