"use client";
import { CategoryStoreProvider, CategoryType } from "entities/category";
import NeedsOnboarding from "./ui/onboarding";
import { NeedsTable } from "@widgets/NeedsTable";
import { ConvertedTasksState, TasksStoreProvider } from "entities/task";
import useLocalStorage from "@hooks/useLocalStorage";
import { Loader } from "@components/Loader";

interface NeedsContentProps {
  categories: CategoryType[];
  programId: string | null;
  tasks: ConvertedTasksState;
  maxResourceCount: number;
  maxTaskCount: number;
}

const Needs: React.FC<NeedsContentProps> = ({
  categories,
  programId,
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
        programId={programId}
        currentCategory={categories[0]}
      >
        <TasksStoreProvider programId={programId} data={tasks}>
          <NeedsTable />
        </TasksStoreProvider>
      </CategoryStoreProvider>
    </div>
  );
};

export default Needs;
