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
import React, { ReactNode, useState } from "react";
import AddIcon from "shared/assets/AddIcon";
import { CreateProgramForm } from "../CreateProgramForm";
import { Program } from "entities/auth/api/types";

interface CreateProgramModalProps {
  onCreated?: (program: Program) => void;
  trigger?: ReactNode;
}

const CreateProgramModal: React.FC<CreateProgramModalProps> = ({
  onCreated,
  trigger,
}) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button withIcon size="lg">
            <AddIcon />
            <span>
              {t("Common.add")} {t("Common.program")}
            </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="flex items-center flex-col w-full max-w-xl p-0"
      >
        <DialogHeader className="pt-[16px]">
          <DialogTitle>
            {t("Common.add")} {t("Common.program")}
          </DialogTitle>
        </DialogHeader>

        <CreateProgramForm onClose={onClose} onCreated={onCreated} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProgramModal;

