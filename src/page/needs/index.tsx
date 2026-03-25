"use client";
import { CategoryStoreProvider, CategoryType } from "entities/category";
import NeedsOnboarding from "./ui/onboarding";
import { NeedsTable } from "@widgets/NeedsTable";
import { ConvertedTasksState, TasksStoreProvider } from "entities/task";
import useLocalStorage from "@hooks/useLocalStorage";
import { Loader } from "@components/Loader";

interface NeedsContentProps {
  categories: CategoryType[];
  tasks: ConvertedTasksState;
  maxResourceCount: number;
  maxTaskCount: number;
}

const Needs: React.FC<NeedsContentProps> = ({
  categories,
  tasks,
  maxResourceCount,
  maxTaskCount,
}) => {
  const {
    storedValue: isFirstTimeOnNeedsPage,
    setValue: setIsFirstTimeOnNeedsPage,
    isLocalValueLoading,
  } = useLocalStorage("isFirstTimeOnNeedsPage", true);

  const onCompleteHandler = () => {
    setIsFirstTimeOnNeedsPage(false);
  };

  if (isLocalValueLoading) {
    return <Loader />;
  }

  if (isFirstTimeOnNeedsPage) {
    return <NeedsOnboarding onComplete={onCompleteHandler} />;
  }

  return (
    <div>
      <CategoryStoreProvider
        maxResourceCount={maxResourceCount}
        maxTaskCount={maxTaskCount}
        categories={categories}
        currentCategory={categories[0]}
      >
        <TasksStoreProvider data={tasks}>
          <NeedsTable />
        </TasksStoreProvider>
      </CategoryStoreProvider>
    </div>
  );
};

export default Needs;
