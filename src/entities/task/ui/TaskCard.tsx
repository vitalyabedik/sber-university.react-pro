import type { Task } from "../model/types";
import styles from "./TaskCard.module.css";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => (
  <div className={styles.card}>
    <span className={styles.title}>
      {task.completed ? "✓ " : "○ "}
      {task.title}
    </span>
  </div>
);
