import { InfoModal } from "@components/InfoModal";
import { Button } from "@components/shadowCDN/button";
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
  const { selectedTasks } = tasksState;

  const onClose = () => {
    setIsOpen(false);
  };

  const isDeleteDisabled = !selectedTasks[category.id]?.length;
  const applyChangesHandle = () => {
    if (!isDeleteDisabled) {
      deleteTaskApi(selectedTasks[category.id]).then(() => {
        deleteSelectedTasks(category.id);
        setIsOpen(false);
      });
    }
  };

  const isActive = !!selectedTasks.length;
  const selectedCount = selectedTasks[category.id]?.length ?? 0;

  return (
    <InfoModal
      setIsOpen={setIsOpen}
      description={t("Tasks.DeleteTasks.description")}
      title={t("Tasks.DeleteTasks.title", { count: selectedCount })}
      isDisabled={isDeleteDisabled}
      isOpen={isOpen}
      acceptHandler={applyChangesHandle}
      onClose={onClose}
      error={""}
      cancelText={t("Common.cancel")}
      acceptText={t("Common.delete")}
    >
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
    </InfoModal>
  );
};

export default DeleteTasks;
