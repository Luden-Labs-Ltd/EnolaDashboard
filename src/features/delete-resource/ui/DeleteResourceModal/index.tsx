"use client";

import { InfoModal } from "@components/InfoModal";
import Row from "@components/Row";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";
import { deleteResource, useResourcesStore } from "entities/resources";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";

interface DeleteResourceModalProps {
  callback?: () => void;
  resourceId: number;
}

const DeleteResourceModal: React.FC<DeleteResourceModalProps> = ({
  callback,
  resourceId,
}) => {
  const t = useTranslations();
  const { resourcesState } = useResourcesStore();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const isDeleteDisabled = !resourceId;

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const deleteHandler = () => {
    if (!isDeleteDisabled) {
      deleteResource(resourceId)
        .then(() => {
          setIsOpen(false);
          callback?.();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <InfoModal
      setIsOpen={setIsOpen}
      description={t("Resources.DeleteResources.description")}
      title={
        <>
          <Row className="gap-[4px]">
            <span>{t("Common.delete")}</span>
            <span>{resourceId}</span>
          </Row>
        </>
      }
      isDisabled={isDeleteDisabled}
      error={error}
      isOpen={isOpen}
      acceptHandler={deleteHandler}
      onClose={onClose}
      cancelText={t("Common.cancel")}
      acceptText={t("Common.delete")}
    >
      <DropdownMenuItem onClick={onOpen} className={"DropdownMenuItem"}>
        <Row alignItems="center" className="gap-[8px]">
          <DeleteIcon height={17} width={17} />
          <span>{t("Common.delete")}</span>
        </Row>
      </DropdownMenuItem>
    </InfoModal>
  );
};

export default DeleteResourceModal;
