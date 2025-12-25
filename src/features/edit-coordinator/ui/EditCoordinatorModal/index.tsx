"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { CoordinatorType } from "entities/users";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";
import { EditCoordinatorForm } from "../EditCoordinatorForm";

interface EditCoordinatorModalProps {
  callback?: () => void;
  coordinator: CoordinatorType;
}

const EditCoordinatorModal: React.FC<PropsWithChildren<EditCoordinatorModalProps>> = ({
  callback,
  coordinator,
  children,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={onClose}
        className="flex items-center flex-col w-full max-w-xl p-0"
      >
        <DialogHeader className="pt-[16px]">
          <DialogTitle>{t("Common.edit")}</DialogTitle>
        </DialogHeader>

        <EditCoordinatorForm callback={onClose} coordinator={coordinator} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCoordinatorModal;
