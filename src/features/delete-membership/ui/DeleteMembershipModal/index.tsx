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
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { useMembershipsStore } from "entities/memberships";
import { deleteMembership } from "entities/memberships/actions";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface DeleteMembershipActionProps {
  callback?: () => void;
  familyId: string;
  membershipId: number;
}

const INITIAL_STATE = {
  data: null,
};

const DeleteMembership: React.FC<PropsWithChildren<DeleteMembershipActionProps>> = ({
  callback,
  children,
  familyId,
  membershipId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const {refetchMembers} = useMembershipsStore()
  const [formState, formAction] = useFormState(deleteMembership, INITIAL_STATE);

  useEffect(() => {
    console.log(formState);
    if (formState.data === "completed") {
      onClose();
      if (familyId) {
        refetchMembers(familyId);
      }
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
          <DialogTitle>{t("Families.DeleteMembership.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Families.DeleteMembership.description")} - {membershipId}
        </DialogDescription>
        <form action={formAction}>
          <input name="family_id" onChange={() => {}} value={familyId} style={{display: 'none'}} />
          <input name="membership_id" onChange={() => {}} value={membershipId} style={{display: 'none'}} />
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

export default DeleteMembership;
