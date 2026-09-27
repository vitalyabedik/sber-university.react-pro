import { useState } from "react";
import type { Task } from "entities/task";

export const TaskStatus = {
  All: "all",
  Completed: "completed",
  Incomplete: "incomplete",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const filterLabels: Record<TaskStatus, string> = {
  [TaskStatus.All]: "Все",
  [TaskStatus.Completed]: "Завершённые",
  [TaskStatus.Incomplete]: "Незавершённые",
};

export const filterEntries: Array<{ value: TaskStatus; label: string }> =
  Object.entries(filterLabels).map(([key, label]) => ({
    value: key as TaskStatus,
    label,
  }));

const initialTasks: Task[] = [
  { id: "1", title: "Изучить React", completed: true },
  { id: "2", title: "Создать компоненты", completed: false },
  { id: "3", title: "Написать тесты", completed: false },
  { id: "4", title: "Провести код-ревью", completed: true },
  { id: "5", title: "Подготовить документацию", completed: false },
];

export const useTasks = (initial: Task[] = initialTasks) => {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.All);

  const filteredTasks = tasks.filter((t) => {
    if (filter === TaskStatus.All) return true;
    if (filter === TaskStatus.Completed) return t.completed;
    return !t.completed;
  });

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  };
};
