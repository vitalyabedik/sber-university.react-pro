import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "danger";
type ButtonSize = "compact" | "block";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "default", size = "compact", className, children, ...rest }, ref) => {
    const cls = [styles.button, styles[variant], styles[size], className || ""]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  },
);
