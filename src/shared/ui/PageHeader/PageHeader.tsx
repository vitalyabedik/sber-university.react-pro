import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export const PageHeader = ({ children, as: Tag = "h1", className }: Props) => (
  <Tag className={[styles.header, className || ""].filter(Boolean).join(" ")}>{children}</Tag>
);
