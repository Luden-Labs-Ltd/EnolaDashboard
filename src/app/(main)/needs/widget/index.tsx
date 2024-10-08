"use client";
import "@styles/pages/needs.scss";
import { useState } from "react";
import {
  NeedsTable,
  Categories,
  HeaderPanel,
  Content,
} from "../feauture/NeedsTable";
import NeedsOnboarding from "../feauture/Onboarding";
import { Button } from "@components/shadowCDN/button";
import CreateCategoryModal from "../feauture/CreateCategory";
import AddIcon from "shared/assets/AddIcon";
import Category, { CategoryPressCallbackArguments } from "@components/Category";
import { CategoryType } from "../lib";

interface NeedsContentProps {
  categories: CategoryType[];
}

const NeedsContent: React.FC<NeedsContentProps> = ({
  categories,
}) => {
  const [showFirstEnter, setShowFirstEnter] = useState(false);

  const [currentCategory, setCurrentCategory] = useState<CategoryType>(categories[0]);

  const onCategoryClick = (data: CategoryPressCallbackArguments) => {
    const newCategory = categories.find((category) => category.id === data.id)
    if (newCategory) {
      setCurrentCategory(newCategory)
    }
  }

  if (showFirstEnter) {
    return <NeedsOnboarding onComplete={() => setShowFirstEnter(false)} />;
  }

  return (
    <div>
      <NeedsTable>
        <Categories>
          <div className="mb-4 gap-2">
            {categories.map((category) => {
              return (
                <Category
                  isPresseble
                  pressCallback={onCategoryClick}
                  key={category.id}
                  title={category.title}
                  id={category.id}
                  active={category.id === currentCategory.id}
                />
              );
            })}
          </div>
          <div className="px-4">
            <CreateCategoryModal
              categories={categories}
              trigger={
                <Button withIcon variant="secondary">
                  <AddIcon />
                  <span className="font-grotesk">Edit category</span>
                </Button>
              }
            />
          </div>
        </Categories>
        <Content>
          <HeaderPanel>
            <h3>Tasks</h3>
          </HeaderPanel>
          <div className="flex flex-1 justify-center items-center"></div>
        </Content>
      </NeedsTable>
    </div>
  );
};

export default NeedsContent;
