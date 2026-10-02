import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "danger";

type Props = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "default", className, children, ...rest }, ref) => {
    const cls = `${styles.button} ${styles[variant]} ${className ?? ""}`.trim();

    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  },
);
