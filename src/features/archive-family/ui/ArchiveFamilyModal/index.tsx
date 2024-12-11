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
import { FamilyType, useFamiliesStore } from "entities/families";
import { editFamily } from "entities/families/actions";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";

interface ArchiveFamilyActionProps {
  callback?: () => void;
  familyId?: FamilyType["id"];
}

const ArchiveFamily: React.FC<PropsWithChildren<ArchiveFamilyActionProps>> = ({
  callback,
  children,
  familyId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { familiesState } = useFamiliesStore();

  const currentFamily = familiesState.families.find(
    (family) => family.id === familyId
  );

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const isArchived = currentFamily?.archived === "true";

  const applyChangesHandle = () => {
    if (currentFamily) {
      editFamily(currentFamily.id, {
        title: currentFamily.name,
        archived: !isArchived,
      })
        .then(() => {
          setIsOpen(false);
          callback?.();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitBtnText = isArchived ? t("Families.unarchive") : t("Families.archive")

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
          {t("Families.ArchiveFamilies.description", {
            familyName: currentFamily?.name,
          })}
        </DialogDescription>
        {/* <DialogDescription className="text-center  text-red-500">
          {`" ${t("Families.ArchiveFamilies.note")} "`}
        </DialogDescription> */}
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
            {submitBtnText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveFamily;
