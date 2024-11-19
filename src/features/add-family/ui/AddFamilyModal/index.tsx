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

interface AddFamilyModalActionProps {}

const AddFamilyModal: React.FC<AddFamilyModalActionProps> = ({}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const applyChangesHandle = () => {
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
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("Families.addFamilies")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          You could add family
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
            {t("Common.add")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamilyModal;
