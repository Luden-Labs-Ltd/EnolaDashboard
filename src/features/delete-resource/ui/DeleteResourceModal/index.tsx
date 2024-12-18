"use client";

import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
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
  const { programId } = resourcesState;
  const isDeleteDisabled = !programId || !resourceId;

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const deleteHandler = () => {
    if (!isDeleteDisabled) {
      deleteResource(programId, resourceId)
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
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onClick={onOpen} className={"DropdownMenuItem"}>
          <Row alignItems="center" className="gap-[8px]">
            <DeleteIcon height={17} width={17} />
            <span>{t("Common.delete")}</span>
          </Row>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <Row className="gap-[4px]">
              <span>{t("Common.delete")}</span>
              <span>{resourceId}</span>
            </Row>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {t("Resources.DeleteResources.description")}
        </DialogDescription>
        {error ? <ZodErrors error={[error]} /> : null}
        <div className="flex gap-6">
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
            disabled={isDeleteDisabled}
            onClick={deleteHandler}
            size={"lg"}
          >
            {t("Common.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteResourceModal;
