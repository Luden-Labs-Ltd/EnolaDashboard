import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableHead } from "@components/shadowCDN/table";
import { HeaderItem, HeaderItemType } from "@widgets/UniversalTable/lib/types";
import { SortArrows } from "features/sort-arrows";
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
  if (header.type === HeaderItemType.EMPTY) {
    return <TableHead></TableHead>;
  }

  if (header.type === HeaderItemType.SELECT) {
    return (
      <TableHead>
        <Checkbox
          onClick={toggleMainSelect}
          checked={isIndeterminate ? "indeterminate" : isChecked ? true : false}
        />
      </TableHead>
    );
  }

  const sortNameParam = sorterObject?.[header.value];

  return (
    <TableHead>
      <div className="flex flex-row items-center gap-[16px]">
        <span>{header.value}</span>
        {sortNameParam?.isSortAvailable && (
          <SortArrows sortName={sortNameParam.apiName} type={sortNameParam.sortType}/>
        )}
      </div>
    </TableHead>
  );
};
