"use client";

import Row from "@components/Row";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";
import { ResourcesType } from "entities/resources";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import EditIcon from "shared/assets/EditIcon";
import { EditResourceForm } from "../EditResourceForm/EditResourceForm";

interface EditResourceModalProps {
  callback?: () => void;
  resource: ResourcesType;
}

const EditResourceModal: React.FC<EditResourceModalProps> = ({
  callback,
  resource,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onClick={onOpen} className={"DropdownMenuItem"}>
          <Row alignItems="center" className="gap-[8px]">
            <EditIcon height={17} width={17} />
            <span>{t("Common.edit")}</span>
          </Row>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={onClose}
        className="flex items-center flex-col w-full max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>{t("Common.edit")}</DialogTitle>
        </DialogHeader>

        <EditResourceForm callback={onClose} resource={resource} />
      </DialogContent>
    </Dialog>
  );
};

export default EditResourceModal;
