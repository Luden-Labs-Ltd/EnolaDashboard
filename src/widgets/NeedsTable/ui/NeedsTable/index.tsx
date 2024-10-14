"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Category,
  CategoryPressCallbackArguments,
  useCategoryStore,
} from "entities/category";
import { AddTaskModal, TaskControlLayout } from "features/add-task";
import CreateCategoryModal from "features/create-category";
import {
  Categories,
  HeaderPanel,
  NeedsContent,
  TableLayout,
} from "@components/table-layout";
import React from "react";
import AddIcon from "shared/assets/AddIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";
import { Task, useTasksStore } from "entities/task";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { SetTaskAsDefaultModal } from "features/set-task-as-default";
import TooltipWrapper from "@components/TooltipWrapper";
import { DeleteTasks } from "features/delete-tasks";
import { EditTasks } from "features/edit-tasks";

interface NeedsTableProps {}

const NeedsTable: React.FC<NeedsTableProps> = () => {
  const { categoryState, setCurrentCategory } = useCategoryStore();
  const { tasksState, toggleSelectedTask } = useTasksStore();

  const { activeCategories, currentCategory } = categoryState;
  const { activeTasks, selectedTasks } = tasksState;

  const onCategoryClick = (payload: CategoryPressCallbackArguments) => {
    const newCategory = activeCategories.find(
      (category) => category.id === payload.id
    );
    if (newCategory) {
      setCurrentCategory(newCategory);
    }
  };

  const onTaskClick = (taskId: string, active: boolean) => {
    toggleSelectedTask(taskId);
  };

  return (
    <TableLayout>
      <Categories>
        <div className="mb-4 gap-2">
          {activeCategories?.map((category) => {
            return (
              <Category
                isPresseble
                pressCallback={onCategoryClick}
                key={category.id}
                title={category.title}
                id={category.id}
                active={category.id === currentCategory.id}
              />
            );
          })}
        </div>
        <div className="px-4">
          <CreateCategoryModal
            trigger={
              <Button withIcon variant="secondary">
                <AddIcon />
                <span className="font-grotesk">Edit category</span>
              </Button>
            }
          />
        </div>
      </Categories>
      <NeedsContent>
        <HeaderPanel>
          <TaskControlLayout>
            <div className="flex gap-[16px] items-center">
              <EditTasks />
              <DeleteTasks />
            </div>
            <AddTaskModal category={currentCategory} />
          </TaskControlLayout>
        </HeaderPanel>
        <ScrollArea className="p-[16px] max-h-[68vh]">
          <div className="flex flex-1 flex-col gap-[12px]">
            {activeTasks.map((task) => {
              return (
                <Task
                  onPress={onTaskClick}
                  key={task.id}
                  id={task.id}
                  active={selectedTasks.includes(task.id)}
                  title={task.title}
                  taskActions={<SetTaskAsDefaultModal />}
                />
              );
            })}
          </div>
        </ScrollArea>
      </NeedsContent>
    </TableLayout>
  );
};

export default NeedsTable;
