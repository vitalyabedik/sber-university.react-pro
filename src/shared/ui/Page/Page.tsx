import type { ReactNode } from "react";
import styles from "./Page.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Page = ({ children, className }: Props) => (
  <div className={[styles.page, className || ""].filter(Boolean).join(" ")}>{children}</div>
);
