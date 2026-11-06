import { useActionState, useEffect, useState } from "react";
import styles from "./React19Examples.module.css";

type SaveState = "idle" | "saving" | "success";

interface SaveResult {
  status: "idle" | "success";
}

const initialState: SaveResult = { status: "idle" };
const successDuration = 2000;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const submit = async (_prevState: SaveResult, formData: FormData): Promise<SaveResult> => {
  const value = String(formData.get("value") || "").trim();

  if (value === "") {
    return _prevState;
  }

  await wait(1000);

  return { status: "success" };
};

const STATUS_LABELS: Record<SaveState, string> = {
  idle: "Сохранить",
  saving: "Saving…",
  success: "Saved!",
};

export const FormWithAsyncSave = () => {
  const [state, submitAction, isPending] = useActionState(submit, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.status !== "success") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), successDuration);

    return () => clearTimeout(timer);
  }, [state]);

  let status: SaveState = state.status;
  if (isPending) status = "saving";
  if (state.status === "success" && !showSuccess) status = "idle";

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>FormWithAsyncSave</h3>
      <p className={styles.hint}>
        useActionState и асинхронный action: React сам сбрасывает форму после ответа
      </p>

      <form action={submitAction} className={styles.form}>
        <label className={styles.label} htmlFor="async-save-value">
          Значение
        </label>
        <input
          id="async-save-value"
          className={styles.input}
          name="value"
          placeholder="Что сохранить"
          autoComplete="off"
        />
        <button type="submit" className={styles.button} disabled={isPending}>
          {STATUS_LABELS[status]}
        </button>
      </form>

      <p className={styles.value}>
        Статус: <strong>{status}</strong>
      </p>
    </section>
  );
};
