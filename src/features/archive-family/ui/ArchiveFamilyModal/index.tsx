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
import React, { PropsWithChildren, useState } from "react";

interface AddFamilyActionProps {
  callback?: () => void;
}

const AddFamily: React.FC<PropsWithChildren<AddFamilyActionProps>> = ({
  callback,
  children,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const applyChangesHandle = () => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={onClose}
        className="flex items-center flex-col w-full max-w-sm"
      >
        <DialogHeader>
          <DialogTitle>{t("Families.ArchiveFamilies.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Families.ArchiveFamilies.description")}
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
            {t("Families.archive")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamily;
