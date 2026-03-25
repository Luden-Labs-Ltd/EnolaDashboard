import { Button } from "@components/shadowCDN/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadowCDN/dialog";
import { useCategoryStore } from "entities/category";
import { CreateCategoryForm } from "features/create-category";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, useState } from "react";
import { CategoriesList } from "./ui/CategoriesList";

interface ManageCategoriesProps {}

export const ManageCategories: React.FC<
  PropsWithChildren<ManageCategoriesProps>
> = ({ children }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { revalidateActiveCategories } = useCategoryStore();

  const applyChanges = () => {
    revalidateActiveCategories();
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex items-center flex-col max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>{t("Categories.CreateCategories.title")}</DialogTitle>
        </DialogHeader>
        <CategoriesList />
        <CreateCategoryForm callback={() => setIsOpen(false)} />
        <div className="flex flex-col gap-6">
          <Button rounded={"circle"} onClick={applyChanges}>
            {t("Common.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
