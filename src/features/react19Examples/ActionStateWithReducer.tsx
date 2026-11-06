import { useActionState } from "react";
import styles from "./React19Examples.module.css";

interface ProfileFields {
  name: string;
  email: string;
  role: string;
}

type SaveStatus = "idle" | "submitting" | "success";

interface FormState {
  status: SaveStatus;
  savedValues: ProfileFields | null;
}

type FormAction = { type: "submitSuccess"; values: ProfileFields };

const EMPTY_FIELDS: ProfileFields = { name: "", email: "", role: "frontend" };

const ROLES = ["frontend", "backend", "qa"];

const initialState: FormState = {
  status: "idle",
  savedValues: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  if (action.type === "submitSuccess") {
    return { ...state, status: "success", savedValues: action.values };
  }

  return state;
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const readFields = (formData: FormData): ProfileFields => ({
  name: String(formData.get("name") || "").trim(),
  email: String(formData.get("email") || "").trim(),
  role: String(formData.get("role") || EMPTY_FIELDS.role),
});

const submit = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const savedValues = readFields(formData);

  await wait(1000);

  return formReducer(prevState, { type: "submitSuccess", values: savedValues });
};

const STATUS_LABELS: Record<SaveStatus, string> = {
  idle: "Форма пустая",
  submitting: "Saving…",
  success: "Saved!",
};

export const ActionStateWithReducer = () => {
  const [state, formAction, isPending] = useActionState(submit, initialState);

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>ActionStateWithReducer</h3>
      <p className={styles.hint}>Состояние формы ведёт редюсер: submitting, success</p>

      <form action={formAction} className={styles.form}>
        <label className={styles.label} htmlFor="profile-name">
          Имя
        </label>
        <input
          id="profile-name"
          className={styles.input}
          name="name"
          placeholder="Иван"
          autoComplete="off"
        />

        <label className={styles.label} htmlFor="profile-email">
          Email
        </label>
        <input
          id="profile-email"
          className={styles.input}
          name="email"
          type="email"
          placeholder="ivan@example.com"
          autoComplete="off"
        />

        <label className={styles.label} htmlFor="profile-role">
          Роль
        </label>
        <select className={styles.input} id="profile-role" name="role" defaultValue="frontend">
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <output className={styles.value} aria-live="polite">
          Статус: <strong>{STATUS_LABELS[isPending ? "submitting" : state.status]}</strong>
        </output>

        {state.savedValues && (
          <output className={styles.value}>
            Сохранено: <strong>{state.savedValues.name}</strong> · {state.savedValues.email} ·{" "}
            {state.savedValues.role}
          </output>
        )}

        <button type="submit" className={styles.button} disabled={isPending}>
          Сохранить
        </button>
      </form>
    </section>
  );
};
