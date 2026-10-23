import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FormField.module.css";

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}) => (
  <div className={styles.field}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      className={`${styles.input} ${(error && styles.inputError) || ""}`}
      type={type}
      {...register(name as Path<T>)}
    />
    {error && <span className={styles.error}>{error.message}</span>}
  </div>
);
