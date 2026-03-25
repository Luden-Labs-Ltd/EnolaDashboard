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
import { useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import EditIcon from "shared/assets/EditIcon";

interface EditTaskActionProps {}

const EditTasks: React.FC<EditTaskActionProps> = ({}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { tasksState } = useTasksStore();
  const { selectedTasks } = tasksState;

  const onClose = () => {
    setIsOpen(false);
  };

  const applyChangesHandle = () => {
    setIsOpen(false);
  };

  const isActive = !!selectedTasks.length;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipWrapper text="Edit">
            <Button
              size={"icon"}
              color={isActive ? "#313A56" : "#A3ABC3"}
              variant={"ghost"}
            >
              <EditIcon />
            </Button>
          </TooltipWrapper>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {t("Tasks.EditTasks.title", { count: 0 })}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Tasks.EditTasks.description")}
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
          <Button rounded={"circle"} onClick={applyChangesHandle} size={"lg"}>
            {t("Common.edit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTasks;
