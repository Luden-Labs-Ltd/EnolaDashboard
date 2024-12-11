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
import { CategoryType } from "entities/category";
import { useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import { AddTaskForm } from "../AddTaskForm";

interface AddTaskActionProps {
  category: CategoryType;
}

const AddTaskModal: React.FC<AddTaskActionProps> = ({ category }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const applyChangesHandle = () => {
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

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon variant={"secondary"}>
          <AddIcon />
          <span>{t("Common.addTask")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {t("Common.add")} {category.title} {t("Common.tasks")}
          </DialogTitle>
        </DialogHeader>

        <AddTaskForm
          callback={() => setIsOpen(false)}
          currentCategory={category}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
