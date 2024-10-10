"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TaskType } from ".";

type TasksContextState = {
  tasks: TaskType[];
  activeTasks: TaskType[];
};

type TasksProviderValue = {
  tasks: TaskType[];
};

const TasksContext = createContext<{
  tasksState: TasksContextState;
  setData: Dispatch<SetStateAction<TasksContextState>>;
} | null>(null);

export const TasksStoreProvider: React.FC<
  PropsWithChildren<TasksProviderValue>
> = ({ tasks, children }) => {
  const activeTasks = tasks.filter((task) => task.active);
  const [tasksState, setTasksState] = useState<TasksContextState>({
    tasks: tasks,
    activeTasks: activeTasks,
  });

  return (
    <TasksContext.Provider
      value={{
        tasksState: tasksState,
        setData: setTasksState,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksStore = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  const { tasksState, setData } = tasksContext;

  const toggleActiveTask = (id: string, active: boolean) => {
    const currentTaskId = id;
    const isActive = active;

    const newTask = tasksState.tasks.map((task) => {
      const isUpdatedTask = task.id === currentTaskId;
      if (isUpdatedTask) {
        return { ...task, active: isActive };
      }
      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTask }));
  };

  const revalidateActiveTasks = () => {
    const activeTasks = tasksState.tasks.filter((task) => task.active);
    setData((prev) => ({ ...prev, activeTasks: activeTasks }));
  };


  return {
    tasksState,
    toggleActiveTask,
    revalidateActiveTasks
  };
};
