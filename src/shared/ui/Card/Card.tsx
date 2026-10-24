import type { ReactNode } from "react";
import styles from "./Card.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => (
  <div className={[styles.card, className || ""].filter(Boolean).join(" ")}>{children}</div>
);
