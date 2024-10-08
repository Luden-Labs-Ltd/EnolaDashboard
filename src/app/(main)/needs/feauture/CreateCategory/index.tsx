import Category from "@components/Category";
import { Button } from "@components/shadowCDN/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@components/shadowCDN/dialog";
import React from "react";
import AddIcon from "shared/assets/AddIcon";
import { CategoryType } from "../../lib";

interface CreateCategoryModalProps {
  trigger: React.ReactNode;
  categories: CategoryType[];
}
const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  trigger,
  categories,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex items-center flex-col max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Edit categories</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col min-w-72 gap-2 mb-3">
          {categories.map((category) => {
            return (
              <Category
                isPresseble
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
            Add Categorie
          </Button>
          <Button rounded={"circle"}>Ok</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
