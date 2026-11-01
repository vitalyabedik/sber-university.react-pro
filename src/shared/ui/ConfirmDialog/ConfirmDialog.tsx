import { useEffect } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../lib/theme";
import { TOOLTIP_ROOT_ID } from "../Tooltip/config";
import styles from "./ConfirmDialog.module.css";

const getPortalRoot = () => document.getElementById(TOOLTIP_ROOT_ID) || document.body;

export interface ConfirmDialogOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog = ({
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  onResolve,
}: ConfirmDialogOptions & { onResolve: (confirmed: boolean) => void }) => {
  const theme = useTheme();

  const handleConfirm = () => onResolve(true);
  const handleCancel = () => onResolve(false);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    handleCancel();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      onResolve(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onResolve]);

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.backdrop} onMouseDown={handleBackdropMouseDown}>
      <div
        className={[styles.dialog, styles[theme]].join(" ")}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <h2 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h2>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={[styles.button, styles.cancel].join(" ")}
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={[styles.button, styles.confirm].join(" ")}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    getPortalRoot(),
  );
};
