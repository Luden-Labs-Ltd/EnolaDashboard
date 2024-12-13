"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConvertedTasksState } from "../lib/converter";

type TasksContextState = {
  originData: ConvertedTasksState;
  selectedTasks: Record<string, number[]>;
  programId: string | null;
};

type TasksProviderValue = {
  data: ConvertedTasksState;
  programId: string | null;
};

const TasksContext = createContext<{
  tasksState: TasksContextState;
  setData: Dispatch<SetStateAction<TasksContextState>>;
} | null>(null);

export const TasksStoreProvider: React.FC<
  PropsWithChildren<TasksProviderValue>
> = ({ data, programId, children }) => {
  const [tasksState, setTasksState] = useState<TasksContextState>({
    originData: data,
    programId: programId,
    selectedTasks: {},
  });

  useEffect(() => {
    setTasksState((prev) => {
      return {
        ...prev,
        originData: data,
      };
    });
  }, [data]);

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

  const toggleActiveTask = ({
    categoryId,
    taskId,
    active,
  }: {
    categoryId: string;
    taskId: number;
    active: boolean;
  }) => {
    const currentTaskId = taskId;
    const isActive = active;

    const newTask = tasksState.originData.tasksByCategory[categoryId].map((task) => {
      const isUpdatedTask = task.id === currentTaskId;
      if (isUpdatedTask) {
        return { ...task, active: isActive };
      }
      return task;
    });

    const newState = {
      ...tasksState.originData.tasksByCategory,
      [categoryId]: newTask
    }
    setData((prev) => ({ ...prev, originData: {...prev.originData, tasksByCategory: newState} }));
  };

  // const revalidateActiveTasks = () => {
  //   const activeTasks = tasksState.tasks.filter((task) => task.active);
  //   setData((prev) => ({ ...prev, activeTasks: activeTasks }));
  // };

  const toggleSelectedTask = (categoryId: string, taskId: number) => {
    const isTaskAlreadySelect = tasksState.selectedTasks[categoryId]?.includes(taskId);

    if (isTaskAlreadySelect) {
      const filteredSelectedTask = tasksState.selectedTasks[categoryId].filter(
        (currentId) => currentId !== taskId
      );
      return setData((prev) => ({
        ...prev,
        selectedTasks: {
          ...prev.selectedTasks,
          [categoryId]: filteredSelectedTask
        },
      }));
    }

    const currentSelectedTasks = tasksState.selectedTasks[categoryId] ? tasksState.selectedTasks[categoryId] : []
    const newSelectedTasks = {
      ...tasksState.selectedTasks,
      [categoryId]: [...currentSelectedTasks, taskId]
    };
    setData((prev) => ({ ...prev, selectedTasks: newSelectedTasks }));
  };

  const deleteSelectedTasks = (categoryId: string ) => {
    const currentSelectedTasks = tasksState.selectedTasks[categoryId];

    if (!currentSelectedTasks.length) {
      return;
    }

    const newCategoryIdTasks = tasksState.originData.tasksByCategory[categoryId].filter((task) => {
      return !currentSelectedTasks.includes(task.id);
    });

    const newAllTasks = tasksState.originData.allTasks.filter((task) => {
      return !currentSelectedTasks.includes(task.id);
    });

    const originData = {
      ...tasksState.originData,
      allTasks: newAllTasks,
      tasksByCategory: {
        ...tasksState.originData.tasksByCategory,
        [categoryId]: newCategoryIdTasks
      }
    }

    setData((prev) => ({
      ...prev,
      originData,
      selectedTasks: {
        ...prev.selectedTasks,
        [categoryId]: []
      }
    }));
  };

  return {
    tasksState,
    toggleActiveTask,
    toggleSelectedTask,
    deleteSelectedTasks,
  };
};
