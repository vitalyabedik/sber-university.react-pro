import type { Task } from "entities/task/model/types";
import { TaskCard } from "entities/task";
import { FilterButton } from "shared/ui/FilterButton";
import { Button } from "shared/ui/Button";
import { filterEntries, filterLabels, TaskStatus } from "../model/useTasks";
import styles from "./TaskList.module.css";

type Props = {
  tasks: Task[];
  filter: TaskStatus;
  setFilter: (f: TaskStatus) => void;
  removeTask: (id: string) => void;
};

export const TaskList = ({ tasks, filter, setFilter, removeTask }: Props) => {
  const activeFilter = filter !== TaskStatus.All;

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {filterEntries.map(({ value, label }) => (
          <FilterButton
            key={value}
            value={value}
            label={label}
            active={filter === value}
            onClick={setFilter}
          />
        ))}
      </div>

      {activeFilter && (
        <span className={styles.count}>
          Показано задач с фильтром «{filterLabels[filter]}»
        </span>
      )}

      {tasks.length === 0 ? (
        <p className={styles.empty}>Задачи не найдены</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <TaskCard task={task} />
              <Button
                className={styles.deleteButton}
                variant="danger"
                onClick={() => removeTask(task.id)}
                aria-label={`Удалить задачу: ${task.title}`}
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
