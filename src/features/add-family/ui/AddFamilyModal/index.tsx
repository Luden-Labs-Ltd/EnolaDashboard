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
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { AddFamilyForm } from "../AddFamilyForm";

interface AddFamilyModalActionProps {}

const AddFamilyModal: React.FC<AddFamilyModalActionProps> = ({}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button withIcon>
          <AddIcon />
          <span>{t("Families.addFamilies")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Families.addFamilies")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Families.AddFamilies.description")}
        </DialogDescription>

        <AddFamilyForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFamilyModal;
