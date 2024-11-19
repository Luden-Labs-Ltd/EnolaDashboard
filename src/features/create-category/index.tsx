import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import {
  Category,
  CategoryPressCallbackArguments,
  useCategoryStore,
} from "entities/category";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddIcon from "shared/assets/AddIcon";

interface CreateCategoryModalProps {
  trigger: React.ReactNode;
}
const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  trigger,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { categoryState, toggleActiveCategory, revalidateActiveCategories } =
    useCategoryStore();
  const { categories } = categoryState;

  const pressCallbackHandler = (payload: CategoryPressCallbackArguments) => {
    toggleActiveCategory(payload.id, payload.isActive);
  };

  const applyChanges = () => {
    revalidateActiveCategories();
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>{t("Categories.CreateCategories.title")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col min-w-72 gap-2 mb-3">
          {categories?.map((category) => {
            return (
              <Category
                isPresseble
                pressCallback={pressCallbackHandler}
                key={category.id}
                title={category.title}
                id={category.id}
                active={category.active}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-6">
          <Button withIcon variant={"secondary"}>
            <AddIcon />
            {t("Common.addCategory")}
          </Button>
          <Button rounded={"circle"} onClick={applyChanges}>
            {t("Common.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
