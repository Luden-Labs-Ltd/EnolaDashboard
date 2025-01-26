"use client";

import FormRender from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMembershipsStore } from "entities/memberships";
import { editMembership } from "entities/memberships/actions";
import {
  EditMembershipForm,
  editMembershipFormScheme,
  getEditMembershipFormFields,
} from "features/edit-membership/model";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { isActionError } from "shared/error/api";

interface EditMembershipModalProps {
  callback?: () => void;
  familyId: number | string;
  membershipId: number | string;
}

const EditMembershipModal: React.FC<
  PropsWithChildren<EditMembershipModalProps>
> = ({ callback, membershipId, familyId, children }) => {
  const t = useTranslations();

  const { membershipsState, refetchMembers } = useMembershipsStore();
  const { memberships } = membershipsState;

  const currentMembership = useMemo(
    () => memberships.find((membership) => membership.id === membershipId),
    [membershipId, memberships]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState("");

  const currentAge =
    typeof currentMembership?.age !== "number" ? 0 : currentMembership.age;

  const isPrimary = currentMembership?.primary === "true" ? true : false;

  const form = useForm<EditMembershipForm>({
    resolver: zodResolver(editMembershipFormScheme),
    defaultValues: {
      first_name: currentMembership?.firstName,
      last_name: currentMembership?.lastName,
      age: currentAge,
      circle: currentMembership?.circle ?? "public",
      gender: currentMembership?.gender ?? "male",
      primary: isPrimary,
    },
  });

  function onSubmit(values: EditMembershipForm) {
    editMembership(familyId, membershipId, values)
      .then((res) => {
        if (isActionError(res)) {
          return setApiError(res.nextError);
        }
        onClose();
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  const onClose = () => {
    refetchMembers(familyId);
    setIsOpen(false);
    form.reset({});
  };

  const applyChangesHandle = () => {
    callback?.();
  };

  const EDIT_MEMBERSHIP_FORM_FIELDS = useMemo(
    () => getEditMembershipFormFields(t),
    [t]
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={onClose}
        className="flex items-center flex-col w-full max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>{t("Common.edit")}</DialogTitle>
        </DialogHeader>

        <FormRender
          formObject={form}
          onSubmitHandler={onSubmit}
          fields={EDIT_MEMBERSHIP_FORM_FIELDS}
          customErrorMessage={apiError}
        >
          <div className="w-full">
            <div className="flex justify-between gap-6">
              <Button
                rounded={"circle"}
                onClick={onClose}
                variant={"secondary"}
                size={"lg"}
              >
                {t("Common.cancel")}
              </Button>
              <Button
                rounded={"circle"}
                type="submit"
                onClick={applyChangesHandle}
                size={"lg"}
              >
                {t("Common.edit")}
              </Button>
            </div>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  );
};

export default EditMembershipModal;
