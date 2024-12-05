"use client";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/shadowCDN/dialog";
import { Switch } from "@components/shadowCDN/switch";
import TooltipWrapper from "@components/TooltipWrapper";
import { useTasksStore } from "entities/task";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CheckIcon from "shared/assets/CheckIcon";

interface SetDefaultModalProps {}

const SetTaskAsDefaultModal: React.FC<SetDefaultModalProps> = ({}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { tasksState } = useTasksStore();
  const { tasks } = tasksState;

  const handleSetDefault = () => {
    setIsOpen(false);
  };

  const onSwitchChange = () => {
    setIsChecked(!isChecked);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsChecked(false);
  };

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <TooltipWrapper text="Set as Default">
        <Switch
          onCheckedChange={onSwitchChange}
          checked={isChecked}
          disabled={isChecked}
          variant={"secondary"}
          icon={<CheckIcon />}
        />
      </TooltipWrapper>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("Tasks.SetDefaultTasks.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("Tasks.SetDefaultTasks.description")}
        </DialogDescription>
        <div className="flex gap-6">
          <Button
            rounded={"circle"}
            variant={"secondary"}
            onClick={handleClose}
            size={"lg"}
          >
            {t("Common.cancel")}
          </Button>
          <Button rounded={"circle"} onClick={handleSetDefault} size={"lg"}>
            {t("Common.activate")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetTaskAsDefaultModal;
