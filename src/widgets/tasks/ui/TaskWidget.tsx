import { TaskList, useTasks } from "features/taskList";

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask } = useTasks();

  return (
    <TaskList
      tasks={tasks}
      filter={filter}
      setFilter={setFilter}
      removeTask={removeTask}
    />
  );
};
