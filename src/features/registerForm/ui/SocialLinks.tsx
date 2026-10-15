import { useFieldArray } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { RegisterValues } from "../model/schema";
import styles from "./SocialLinks.module.css";

type Props = {
  control: Control<RegisterValues>;
  errors: FieldErrors<RegisterValues>;
};

export const SocialLinks = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Социальные ссылки</h3>
      {errors.socialLinks?.message && (
        <span className={styles.error}>{errors.socialLinks.message}</span>
      )}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.rowWrapper}>
          <div className={styles.row}>
            <input
              className={`${styles.input} ${
                errors?.socialLinks?.[index]?.url ? styles.inputError : ""
              }`}
              {...control.register(`socialLinks.${index}.url` as const)}
              placeholder={`Ссылка ${index + 1} (GitHub и т.д.)`}
            />
            {fields.length > 1 && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => remove(index)}
                aria-label={`Удалить ссылку ${index + 1}`}
              >
                ✕
              </button>
            )}
          </div>
          <span className={styles.error}>{errors.socialLinks?.[index]?.url?.message}</span>
        </div>
      ))}
      <button type="button" className={styles.addButton} onClick={() => append({})}>
        + Добавить ссылку
      </button>
    </div>
  );
};
