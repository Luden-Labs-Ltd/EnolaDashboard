"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { CategoryType } from "entities/category";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { ResourceForm } from "../ResourceForm/ResourceForm";

interface AddResourcesModalActionProps {
  categories: CategoryType[];
}

const AddResourcesModal: React.FC<AddResourcesModalActionProps> = ({
  categories,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon size={"full"} rounded={"circle"}>
          <AddIcon />
          <span>{t("Resources.newResources")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full">
        <DialogHeader>
          <DialogTitle>{t("Resources.addResources")}</DialogTitle>
        </DialogHeader>
        <div className="w-full p-[40px]">
          <ResourceForm categories={categories} callback={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourcesModal;
