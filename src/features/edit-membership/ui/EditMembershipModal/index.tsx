"use client";

import FormRender from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
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
import { MembershipDialogContent } from "features/membership-form/ui/MembershipDialogContent";

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

  const isPrimary = currentMembership?.primary === "true" ? true : false;

  const form = useForm<EditMembershipForm>({
    resolver: zodResolver(editMembershipFormScheme),
    defaultValues: {
      first_name: currentMembership?.firstName,
      last_name: currentMembership?.lastName,
      circle: currentMembership?.circle ?? "public",
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
      <MembershipDialogContent
        title={t("Common.edit")}
        onInteractOutside={onClose}
      >
        <FormRender
          formObject={form}
          onSubmitHandler={onSubmit}
          fields={EDIT_MEMBERSHIP_FORM_FIELDS}
          customErrorMessage={apiError}
        >
          <div className="w-full pt-6">
            <div className="flex justify-end gap-4">
              <Button
                rounded={"circle"}
                onClick={onClose}
                variant={"secondary"}
                size={"lg"}
                type="button"
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
      </MembershipDialogContent>
    </Dialog>
  );
};

export default EditMembershipModal;
