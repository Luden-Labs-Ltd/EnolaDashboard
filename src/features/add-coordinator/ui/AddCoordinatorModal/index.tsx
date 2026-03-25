"use client";

import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { AddCoordinatorForm } from "../AddCoordinatorForm";
import { Program } from "entities/auth/api/types";

interface AddCoordinatorModalActionProps {
  programs: Program[];
}

const AddCoordinatorModal: React.FC<AddCoordinatorModalActionProps> = ({ programs }) => {
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
          <span>{t("Coordinators.addCoordinators")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="flex items-center flex-col w-full max-w-xl p-0">
        <DialogHeader className="pt-[16px]">
          <DialogTitle>{t("Coordinators.addCoordinators")}</DialogTitle>
        </DialogHeader>

        <AddCoordinatorForm onClose={onClose} programs={programs} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCoordinatorModal;
