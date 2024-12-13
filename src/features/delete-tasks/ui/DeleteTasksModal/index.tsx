import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import TooltipWrapper from "@components/TooltipWrapper";
import { CategoryType } from "entities/category";
import { deleteTaskApi, useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";

interface DeleteTaskActionProps {
  category: CategoryType;
}

const DeleteTasks: React.FC<DeleteTaskActionProps> = ({ category }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { tasksState, deleteSelectedTasks } = useTasksStore();
  const { selectedTasks, programId } = tasksState;

  const onClose = () => {
    setIsOpen(false);
  };

  const isDeleteDisabled = !programId || !selectedTasks[category.id]?.length
  const applyChangesHandle = () => {
    if (!isDeleteDisabled) {
      deleteTaskApi(programId, selectedTasks[category.id]);
      deleteSelectedTasks(category.id);
      setIsOpen(false);
    }
  };

  const isActive = !!selectedTasks.length;
  const selectedCount = selectedTasks[category.id]?.length ?? 0;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipWrapper text="Delete">
            <Button
              size={"icon"}
              color={isActive ? "#313A56" : "#A3ABC3"}
              variant={"ghost"}
            >
              <DeleteIcon />
            </Button>
          </TooltipWrapper>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {t("Tasks.DeleteTasks.title", { count: selectedCount })}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Tasks.DeleteTasks.description")}
        </DialogDescription>
        <div className="flex gap-6">
          <Button
            rounded={"circle"}
            onClick={onClose}
            variant={"secondary"}
            size={"lg"}
          >
            {t("Common.cancel")}
          </Button>
          <Button rounded={"circle"} disabled={isDeleteDisabled} onClick={applyChangesHandle} size={"lg"}>
            {t("Common.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTasks;
