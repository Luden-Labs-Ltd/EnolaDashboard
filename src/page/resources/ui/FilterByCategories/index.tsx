import { createQueryString } from "@lib/url";
import {
  Category,
  CategoryPressCallbackArguments,
  CategoryType,
} from "entities/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface FilterByCategoriesProps {
  categories: CategoryType[];
}

export const FilterByCategories: React.FC<FilterByCategoriesProps> = ({
  categories,
}) => {
  const [currentFilteredCategory, setCurrentFilteredCategory] = useState("all");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        pressCallback={onFilterClick}
        title={"all"}
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
            count={category.count}
            title={category.title}
          />
        );
      })}
    </div>
  );
};
