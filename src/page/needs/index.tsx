"use client";
import { CategoryStoreProvider, CategoryType } from "entities/category";
import { useState } from "react";
import NeedsOnboarding from "./ui/onboarding";
import { NeedsTable } from "@widgets/NeedsTable";
import { ConvertedTasksState, TasksStoreProvider } from "entities/task";

interface NeedsContentProps {
  categories: CategoryType[];
  programId: string | null;
  tasks: ConvertedTasksState;
}

const Needs: React.FC<NeedsContentProps> = ({
  categories,
  programId,
  tasks,
}) => {
  const [showFirstEnter, setShowFirstEnter] = useState(false);

  if (showFirstEnter) {
    return <NeedsOnboarding onComplete={() => setShowFirstEnter(false)} />;
  }

  return (
    <div>
      <CategoryStoreProvider
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
