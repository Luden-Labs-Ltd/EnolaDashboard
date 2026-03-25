import TooltipWrapper from "@components/TooltipWrapper";
import { createQueryString } from "@lib/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SortIcons from "shared/assets/SortIcons";
import { Sort, SortType } from "shared/types/sort";

interface SortArrowsProps {
  sortName: string;
  sortOrder?: Sort;
  type: SortType;
}

export const SortArrows: React.FC<SortArrowsProps> = ({
  sortName,
  sortOrder = "desc",
  type,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initSortParam = searchParams.get("sort");

  const initSortObject =
    typeof initSortParam === "string"
      ? JSON.parse(initSortParam)
      : {
        order: sortOrder,
      };

  const defaultOrder =
    initSortObject.name === sortName ? initSortObject.order : sortOrder;
  const [order, setOrder] = useState<Sort>(defaultOrder);

  const onClickHandler = () => {
    const newSort = order === "desc" ? "asc" : "desc";
    const sortConfig = JSON.stringify({
      name: sortName,
      order: newSort,
    });
    router.push(
      pathname + "?" + createQueryString("sort", sortConfig, searchParams)
    );
    setOrder(newSort);
  };

  const renderCurrentTooltip = () => {
    switch (type) {
      case "number":
        return (
          <span className="flex flex-row gap-1">
            <span>0</span>
            <SortIcons height={14} width={14} />
            <span>9</span>
          </span>
        );
      case "text":
      default:
        return (
          <span className="flex flex-row gap-1">
            <span>A</span>
            <SortIcons height={14} width={14} />
            <span>Z</span>
          </span>
        );
    }
  };

  const color = order === "asc" ? "#B4E5F4" : "";
  return (
    <TooltipWrapper text={renderCurrentTooltip()}>
      <SortIcons
        className="cursor-pointer"
        onClick={onClickHandler}
        color={color}
        height={16}
        width={16}
      />
    </TooltipWrapper>
  );
};
