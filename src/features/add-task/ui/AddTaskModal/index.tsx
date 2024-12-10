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

interface AddTaskActionProps {
  category: CategoryType;
}

const AddTaskModal: React.FC<AddTaskActionProps> = ({ category }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { tasksState, toggleActiveTask, revalidateActiveTasks } =
    useTasksStore();
  const { tasks } = tasksState;

  const applyChangesHandle = () => {
    revalidateActiveTasks();
    setIsOpen(false);
  };

  if (!category) {
    return (
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button withIcon variant={"secondary"}>
            <AddIcon />
            <span>{t("Common.addTask")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex items-center flex-col w-full max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              Tasks Not Set
            </DialogTitle>
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

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon variant={"secondary"}>
          <AddIcon />
          <span>{t("Common.addTask")}</span>
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
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  onPress={toggleActiveTask}
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

export default AddTaskModal;
