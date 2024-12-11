"use client";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/shadowCDN/dialog";
import TooltipWrapper from "@components/TooltipWrapper";
import { TaskType } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import ViewIcon from "shared/assets/ViewIcon";

interface ViewTaskModalProps {
  task: TaskType;
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ task }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const values = [
    {
      name: t('Tasks.ViewTasks.fields.title'),
      value: task.title,
    },
    {
      name: t('Tasks.ViewTasks.fields.description'),
      value: task.description,
    },
    {
      name: t('Tasks.ViewTasks.fields.circle'),
      value: task.circle,
    },
    {
      name: t('Tasks.ViewTasks.fields.iaActive'),
      value: String(task.active),
    },
  ];

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <TooltipWrapper text="Set as Default">
        <Button
          onClick={() => setIsOpen(true)}
          withIcon
          size={"icon"}
          variant={"secondary"}
        >
          <ViewIcon />
        </Button>
      </TooltipWrapper>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("Tasks.ViewTasks.title")}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-[12px]">
          {values.map((value) => {
            return (
              <Row key={`${value.name}-${task.id}-${value.value}`} alignItems="center" className="flex flex-1 justify-between">
                <p className="text-[#313E44] font-[565] text-[20px]">{value.name}</p>
                <p className="text-[#313E44] text-[18px]">{value.value}</p>
              </Row>
            );
          })}
        </div>
        <div className="flex gap-6">
          <Button
            rounded={"circle"}
            variant={"secondary"}
            onClick={handleClose}
            size={"lg"}
          >
            {t("Common.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskModal;
