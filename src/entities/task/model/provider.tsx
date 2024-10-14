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
  selectedTasks: string[];
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
    selectedTasks: [],
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

  const toggleSelectedTask = (taskId: string) => {
    const isTaskAlreadySelect = tasksState.selectedTasks.includes(taskId);

    if (isTaskAlreadySelect) {
      const filteredSelectedTask = tasksState.selectedTasks.filter((currentId) => currentId !== taskId)
      return setData((prev) => ({ ...prev, selectedTasks: filteredSelectedTask }));
    }
    const newSelectedTasks = [...tasksState.selectedTasks, taskId]
    setData((prev) => ({ ...prev, selectedTasks: newSelectedTasks }));
  };

  const deleteSelectedTasks = () => {
    const currentSelectedTasks = tasksState.selectedTasks

    if (!currentSelectedTasks.length) {
      return
    }

    const newTasks = tasksState.tasks.filter((task) => {
      return !currentSelectedTasks.includes(task.id)
    })
    const activeTasks = newTasks.filter((task) => task.active);

    setData((prev) => ({ ...prev, tasks: newTasks,  selectedTasks: [], activeTasks }));
  };


  return {
    tasksState,
    toggleActiveTask,
    revalidateActiveTasks,
    toggleSelectedTask,
    deleteSelectedTasks,
  };
};
