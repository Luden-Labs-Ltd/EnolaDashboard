"use client";

import { InfoModal } from "@components/InfoModal";
import { deleteMembership } from "entities/memberships/actions";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";
import { isActionError } from "shared/error/api";

interface DeleteMembershipActionProps {
  callback?: () => void;
  familyId: string;
  membershipId: number;
}

const DeleteMembership: React.FC<
  PropsWithChildren<DeleteMembershipActionProps>
> = ({ callback, children, familyId, membershipId }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState("");

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const applyChangesHandle = () => {
    deleteMembership(familyId, String(membershipId))
      .then((res) => {
        if (isActionError(res)) {
          return setError(res.nextError);
        }
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <InfoModal
      setIsOpen={setIsOpen}
      description={`${t(
        "Families.DeleteMembership.description"
      )} - ${membershipId}`}
      title={t("Families.DeleteMembership.title")}
      isDisabled={!membershipId && !familyId}
      error={error}
      isOpen={isOpen}
      acceptHandler={applyChangesHandle}
      onClose={onClose}
      cancelText={t("Common.cancel")}
      acceptText={t("Common.delete")}
    >
      {children}
    </InfoModal>
  );
};

export default DeleteMembership;
