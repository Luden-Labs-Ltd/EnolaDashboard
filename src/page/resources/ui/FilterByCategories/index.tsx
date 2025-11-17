import { createQueryString } from "@lib/url";
import {
  Category,
  CategoryPressCallbackArguments,
  useCategoryStore,
} from "entities/category";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface FilterByCategoriesProps {}

export const FilterByCategories: React.FC<FilterByCategoriesProps> = ({}) => {
  const [currentFilteredCategory, setCurrentFilteredCategory] = useState("all");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { categoryState } = useCategoryStore();
  const t = useTranslations()
  const { categories, maxResourceCount } = categoryState;

  const onFilterClick = ({ id }: CategoryPressCallbackArguments) => {
    const newSearchParams = createQueryString("category_id", id, searchParams);
    router.push(pathname + "?" + newSearchParams);
    setCurrentFilteredCategory(id);
  };

  return (
    <div className="flex flex-wrap gap-[10px] mb-9">
      <Category
        isPresseble
        id={"all"}
        active={currentFilteredCategory === "all"}
        variant="chip"
        color="secondary"
        count={maxResourceCount}
        pressCallback={onFilterClick}
        title={t('Common.')}
        iconType={"general"}
      />
      {categories.map((category) => {
        return (
          <Category
            isPresseble
            key={category.id}
            id={category.id}
            color="secondary"
            active={currentFilteredCategory === category.id}
            pressCallback={onFilterClick}
            iconType={category.icon}
            variant="chip"
            count={category.resourceCount}
            title={category.title}
          />
        );
      })}
    </div>
  );
};
