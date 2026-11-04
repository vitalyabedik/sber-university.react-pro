import { startTransition, useOptimistic, useState } from "react";
import { TaskCard } from "entities/task";
import type { Task } from "entities/task";
import styles from "./React19Examples.module.css";

const initialTasks: Task[] = [
  { id: 1, title: "Прочитать задание", completed: false },
  { id: 2, title: "Посмотреть на useOptimistic", completed: true },
];

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const saveTaskToServer = async (title: string, id: number): Promise<Task> => {
  await wait(1000);

  return { id, title, completed: false };
};

export const TodoListOptimistic = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [savingCount, setSavingCount] = useState(0);
  const [optimisticTasks, addOptimisticTask] = useOptimistic<Task[], Task>(
    tasks,
    (currentTasks, task) => [...currentTasks, task],
  );

  const handleSubmit = (formData: FormData) => {
    const title = String(formData.get("title") || "").trim();
    if (title === "") return;

    const id = createId();

    setSavingCount((count) => count + 1);

    startTransition(async () => {
      addOptimisticTask({ id, title, completed: false });

      const savedTask = await saveTaskToServer(title, id);

      setTasks((currentTasks) => [...currentTasks, savedTask]);
      setSavingCount((count) => count - 1);
    });
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>TodoListOptimistic</h3>
      <p className={styles.hint}>
        useOptimistic: задача появляется сразу, в серверный список попадает через секунду
      </p>

      <form action={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="optimistic-task-title">
          Новая задача
        </label>
        <input
          id="optimistic-task-title"
          className={styles.input}
          name="title"
          placeholder="Что нужно сделать"
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={savingCount > 0}
          aria-busy={savingCount > 0}
        >
          {savingCount > 0 ? "Сохраняется…" : "Добавить"}
        </button>
      </form>

      <ul className={styles.list}>
        {optimisticTasks.map((task, index) => {
          const optimistic = index >= tasks.length;

          return (
            <li key={task.id} className={styles.listItem}>
              <span className={optimistic ? styles.badge : styles.badgeHidden}>Сохраняется…</span>
              <div className={optimistic ? styles.listItemRowPending : styles.listItemRow}>
                <TaskCard task={task} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
