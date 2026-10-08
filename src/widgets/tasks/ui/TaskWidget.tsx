import { TaskList, useTasks } from "features/taskList";

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask, isLoading } = useTasks();

  if (isLoading) return <div>Загрузка задач...</div>;

  return <TaskList tasks={tasks} filter={filter} setFilter={setFilter} removeTask={removeTask} />;
};
