"use client";

import { InfoModal } from "@components/InfoModal";
import { deleteCoordinator } from "entities/users/actions";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";

interface DeleteCoordinatorActionProps {
  callback?: () => void;
  coordinatorId?: string;
}

const DeleteCoordinator: React.FC<PropsWithChildren<DeleteCoordinatorActionProps>> = ({
  callback,
  children,
  coordinatorId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const applyChangesHandle = () => {
    if (!coordinatorId) {
      return;
    }
    deleteCoordinator(coordinatorId)
      .then((res) => {
        if (res?.nextError) {
          return setError(res?.nextError);
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
      description={t("Coordinators.DeleteCoordinators.description") + ` - ${coordinatorId}`}
      title={t("Coordinators.DeleteCoordinators.title")}
      isDisabled={!coordinatorId}
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

export default DeleteCoordinator;
