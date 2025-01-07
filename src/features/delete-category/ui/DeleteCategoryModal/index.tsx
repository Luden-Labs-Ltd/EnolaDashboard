"use client";

import { InfoModal } from "@components/InfoModal";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import {
  CategoryType,
  deleteCategory,
  useCategoryStore,
} from "entities/category";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";

interface DeleteCategoryModalProps {
  callback?: () => void;
  category: CategoryType;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  callback,
  category,
}) => {
  const t = useTranslations();
  const { categoryState } = useCategoryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { programId } = categoryState;
  const isDeleteDisabled = !programId || !category.id;

  const onClose = () => {
    setIsOpen(false);
    callback?.();
  };

  const deleteHandler = () => {
    if (!isDeleteDisabled) {
      deleteCategory(programId, category.id)
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
      description={t("Categories.Delete.description")}
      title={
        <>
          <Row className="gap-[4px]">
            <span>{t("Common.delete")}</span>
            <span>{category.title}</span>
          </Row>
        </>
      }
      isDisabled={isDeleteDisabled}
      isOpen={isOpen}
      acceptHandler={deleteHandler}
      onClose={onClose}
      error={error}
      cancelText={t("Common.cancel")}
      acceptText={t("Common.delete")}
    >
      <Button size={"icon"} className="h-[28px] w-[28px]" variant={"secondary"}>
        <DeleteIcon height={17} />
      </Button>
    </InfoModal>
  );
};

export default DeleteCategoryModal;
