import { useActionState, useState } from "react";
import styles from "./SubscribeWizard.module.css";

type State = { success: boolean; error: string };

const initialState: State = { success: false, error: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function subscribeAction(_state: State, formData: FormData): Promise<State> {
  await new Promise((r) => setTimeout(r, 800));
  const email = String(formData.get("email") || "");
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "Укажите корректный email" };
  }
  return { success: true, error: "" };
}

export const SubscribeWizard = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [stepError, setStepError] = useState("");
  const [state, formAction, pending] = useActionState(subscribeAction, initialState);

  const handleNext = () => {
    if (!EMAIL_RE.test(email)) {
      setStepError("Укажите корректный email");
      return;
    }
    setStepError("");
    setStep(2);
  };

  const handleBack = () => {
    setStepError("");
    setStep(1);
  };

  if (state.success) {
    return (
      <div className={styles.container}>
        <p className={styles.successText}>✅ Спасибо! {email} подписан на рассылку.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.container}>
      <p className={styles.stepBadge}>Шаг {step} из 2</p>

      {step === 1 && (
        <>
          <label className={styles.label} htmlFor="sub-email">
            Шаг 1 — Введите email:
          </label>
          <input
            id="sub-email"
            name="email"
            type="email"
            className={`${styles.input} ${stepError ? styles.inputError : ""}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
          {stepError && <p className={styles.error}>{stepError}</p>}
          <button type="button" className={styles.button} onClick={handleNext} disabled={pending}>
            Далее →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className={styles.confirmText}>
            Подтвердите подписку на <strong>{email}</strong>?
          </p>
          {/* скрытое поле нужно действию: input шага 1 размонтирован */}
          <input type="hidden" name="email" value={email} />
          {state.error && <p className={styles.error}>{state.error}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={handleBack}
              disabled={pending}
            >
              ← Назад
            </button>
            <button type="submit" className={styles.button} disabled={pending}>
              {pending ? "Отправка…" : "✓ Да, подписаться"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};
