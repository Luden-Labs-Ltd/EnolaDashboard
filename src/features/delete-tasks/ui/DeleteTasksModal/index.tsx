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
import React, { useState } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";

interface DeleteTaskActionProps {}

const DeleteTasks: React.FC<DeleteTaskActionProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tasksState, deleteSelectedTasks } =
    useTasksStore();
  const { selectedTasks } = tasksState;

  const onClose = () => {
    setIsOpen(false);
  };

  const applyChangesHandle = () => {
    deleteSelectedTasks();
    setIsOpen(false);
  };

  const isActive = !!selectedTasks.length

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipWrapper text="Delete">
            <Button size={"icon"} color={isActive ?  "#313A56" : "#A3ABC3"} variant={"ghost"}>
              <DeleteIcon />
            </Button>
          </TooltipWrapper>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Tasks ({selectedTasks.length})</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          After clicking the Delete button, it will be impossible to restore
          tasks.
        </DialogDescription>
        <div className="flex gap-6">
          <Button rounded={"circle"} onClick={onClose} variant={"secondary"} size={"lg"}>
            Cancel
          </Button>
          <Button rounded={"circle"} onClick={applyChangesHandle} size={"lg"}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTasks;
