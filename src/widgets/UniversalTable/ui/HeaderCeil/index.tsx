import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableHead } from "@components/shadowCDN/table";
import { getTranslateValueOrDefault } from "@widgets/UniversalTable/lib/translate";
import { HeaderItem, HeaderItemType } from "@widgets/UniversalTable/lib/types";
import { SortArrows } from "features/sort-arrows";
import { useTranslations } from "next-intl";
import React from "react";
import { SorterObject } from "shared/types/sort";

interface HeaderProps {
  header: HeaderItem;
  isIndeterminate: boolean;
  isChecked: boolean;
  sorterObject?: SorterObject;
  toggleMainSelect: () => void;
}

export const HeaderCeil: React.FC<HeaderProps> = ({
  header,
  isChecked,
  isIndeterminate,
  sorterObject,
  toggleMainSelect,
}) => {
  const t = useTranslations()
  if (header.type === HeaderItemType.EMPTY) {
    return <TableHead></TableHead>;
  }

  if (header.type === HeaderItemType.SELECT) {
    return (
      <TableHead>
        <Checkbox
          className="border-primary"
          onClick={toggleMainSelect}
          checked={isIndeterminate ? "indeterminate" : isChecked ? true : false}
        />
      </TableHead>
    );
  }
  const sortNameParam = sorterObject?.[header.value];

  const valueToShow = getTranslateValueOrDefault(t, header?.translate, header.value)

  return (
    <TableHead>
      <div className="flex flex-row items-center gap-[16px]">
        <span>{valueToShow}</span>
        {sortNameParam?.isSortAvailable && (
          <SortArrows sortName={sortNameParam.apiName} type={sortNameParam.sortType} />
        )}
      </div>
    </TableHead>
  );
};
