"use client";

import { InfoModal } from "@components/InfoModal";
import { deleteFamily } from "entities/families";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";

interface DeleteFamilyActionProps {
  callback?: () => void;
  familyId?: number;
}

const DeleteFamily: React.FC<PropsWithChildren<DeleteFamilyActionProps>> = ({
  callback,
  children,
  familyId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const applyChangesHandle = () => {
    if (!familyId) {
      return;
    }
    deleteFamily(familyId)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <InfoModal
      setIsOpen={setIsOpen}
      description={`${t("Families.DeleteFamilies.description")} - ${familyId}`}
      title={t("Families.DeleteFamilies.title")}
      isDisabled={!familyId}
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

export default DeleteFamily;
