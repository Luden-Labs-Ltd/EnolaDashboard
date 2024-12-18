"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Category,
  CategoryPressCallbackArguments,
  useCategoryStore,
} from "entities/category";
import { AddTaskModal } from "features/add-task";
import {
  Categories,
  HeaderPanel,
  NeedsContent,
  TableLayout,
} from "@components/table-layout";
import React, { useMemo } from "react";
import AddIcon from "shared/assets/AddIcon";
import { Task, useTasksStore } from "entities/task";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { SetTaskAsDefaultModal } from "features/set-task-as-default";
import { DeleteTasks } from "features/delete-tasks";
import { useTranslations } from "next-intl";
import { TaskControlLayout, ManageTaskModal } from "features/manage-task";
import Row from "@components/Row";
import ViewIcon from "shared/assets/ViewIcon";
import { ViewTaskModal } from "features/view-task";
import { ManageCategories } from "page/needs/ui/ManageCategories";

interface NeedsTableProps {}

const NeedsTable: React.FC<NeedsTableProps> = () => {
  const t = useTranslations();

  const { categoryState, setCurrentCategory } = useCategoryStore();
  const { tasksState, toggleSelectedTask } = useTasksStore();

  const { activeCategories, currentCategory } = categoryState;
  const { originData, selectedTasks } = tasksState;

  const currentCategoryId = currentCategory.id;
  const onCategoryClick = (payload: CategoryPressCallbackArguments) => {
    const newCategory = activeCategories.find(
      (category) => category.id === payload.id
    );
    if (newCategory) {
      setCurrentCategory(newCategory);
    }
  };

  const onTaskClick = (taskId: number) => {
    toggleSelectedTask(currentCategoryId, taskId);
  };

  const activeTasks = useMemo(() => {
    return (
      originData.tasksByCategory[currentCategoryId]?.filter(
        (task) => task.active
      ) ?? []
    );
  }, [currentCategoryId, originData.tasksByCategory]);

  return (
    <TableLayout>
      <Categories>
        <div className="mb-4 gap-2">
          {activeCategories?.map((category) => {
            return (
              <Category
                isPresseble
                iconType={category.icon}
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
          <ManageCategories>
            <Button withIcon variant="secondary">
              <AddIcon />
              <span className="font-grotesk">{t("Common.editCategory")}</span>
            </Button>
          </ManageCategories>
        </div>
      </Categories>
      <NeedsContent>
        <HeaderPanel>
          <TaskControlLayout>
            <div className="flex gap-[16px] items-center">
              {/* <EditTasks /> */}
              <DeleteTasks category={currentCategory} />
              <ManageTaskModal category={currentCategory} />
            </div>
            <AddTaskModal category={currentCategory} />
          </TaskControlLayout>
        </HeaderPanel>
        <ScrollArea className="p-[16px] max-h-[68vh]">
          <div className="flex flex-1 flex-col gap-[12px]">
            {currentCategory
              ? activeTasks.map((task) => {
                  const isTaskSelected = selectedTasks[
                    currentCategoryId
                  ]?.includes(task.id);
                  return (
                    <Task
                      onPress={onTaskClick}
                      key={task.id}
                      id={task.id}
                      active={isTaskSelected}
                      title={task.title}
                      taskActions={
                        <Row alignItems="center">
                          <SetTaskAsDefaultModal />

                          <ViewTaskModal task={task} />
                        </Row>
                      }
                    />
                  );
                })
              : null}
          </div>
        </ScrollArea>
      </NeedsContent>
    </TableLayout>
  );
};

export default NeedsTable;
