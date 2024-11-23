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
import { Input } from "@components/shadowCDN/input";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { deleteFamily } from "entities/families";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface DeleteFamilyActionProps {
  callback?: () => void;
  familyId?: number;
}

const INITIAL_STATE = {
  data: null,
};

const DeleteFamily: React.FC<PropsWithChildren<DeleteFamilyActionProps>> = ({
  callback,
  children,
  familyId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);


  const [formState, formAction] = useFormState(deleteFamily, INITIAL_STATE);

  useEffect(() => {
    if (formState.data === "completed") {
      onClose();
    }
  }, [formState]);

  const apiError = formState?.apiError;

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const applyChangesHandle = () => {
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
          <DialogTitle>{t("Families.DeleteFamilies.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Families.DeleteFamilies.description")} - {familyId}
        </DialogDescription>
        <form action={formAction}>
          <input name="family_id" onChange={() => {}} value={familyId} style={{display: 'none'}} />
          <div className="flex gap-6">
            <Button
              rounded={"circle"}
              onClick={onClose}
              variant={"secondary"}
              size={"lg"}
            >
              {t("Common.cancel")}
            </Button>
            <Button rounded={"circle"} type="submit" onClick={applyChangesHandle} size={"lg"}>
              {t("Common.delete")}
            </Button>
          </div>
          {apiError ? <ZodErrors error={[apiError]} /> : null }
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFamily;
