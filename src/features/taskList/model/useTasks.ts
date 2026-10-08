import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetTasksQuery, type Task } from "entities/task";

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

export const filterEntries: Array<{ value: TaskStatus; label: string }> = Object.entries(
  filterLabels,
).map(([key, label]) => ({
  value: key as TaskStatus,
  label,
}));

export const useTasks = () => {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.All);

  const { data: remoteTasks = [], isLoading } = useGetTasksQuery();

  useEffect(() => {
    if (remoteTasks.length === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalTasks(remoteTasks);
  }, [remoteTasks]);

  const filteredTasks = useMemo(
    () =>
      localTasks.filter((t) => {
        if (filter === TaskStatus.All) return true;
        if (filter === TaskStatus.Completed) return t.completed;
        return !t.completed;
      }),
    [localTasks, filter],
  );

  const removeTask = useCallback((id: number) => {
    setLocalTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return {
    tasks: filteredTasks,
    isLoading,
    filter,
    setFilter,
    removeTask,
  };
};
