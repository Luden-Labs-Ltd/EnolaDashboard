import { Button } from "@components/shadowCDN/button";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@components/shadowCDN/dialog";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { CategoryType } from "entities/category";
import { Task, useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import EditIcon from "shared/assets/EditIcon";

interface ManageTaskActionProps {
  category: CategoryType;
}

const ManageTaskModal: React.FC<ManageTaskActionProps> = ({ category }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { tasksState, toggleActiveTask } = useTasksStore();
  const { originData } = tasksState;

  const currentCategoryTasks = originData.tasksByCategory[category.id] ?? [];

  const applyChangesHandle = () => {
    setIsOpen(false);
  };

  if (!category) {
    return (
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button withIcon variant={"secondary"}>
            <AddIcon />
            <span>Manage Task</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex items-center flex-col w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>Category Not Set</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <Button rounded={"circle"} onClick={applyChangesHandle} size={"lg"}>
              {t("Common.ok")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const toggleActiveTaskHandler = (taskId: number, active: boolean) => {
    toggleActiveTask({
      categoryId: category.id,
      taskId,
      active,
    });
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon variant={"secondary"}>
          <EditIcon />
          <span>Manage Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {category.title} {t("Common.tasks")}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] w-full border p-4">
          <div className="flex flex-col gap-[16px]">
            {currentCategoryTasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  onPress={toggleActiveTaskHandler}
                  title={task.title}
                  active={task.active}
                />
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-6">
          <Button rounded={"circle"} onClick={applyChangesHandle} size={"lg"}>
            {t("Common.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTaskModal;
