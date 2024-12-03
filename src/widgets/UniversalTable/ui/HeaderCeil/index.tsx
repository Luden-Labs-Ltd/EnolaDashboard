import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableHead } from "@components/shadowCDN/table";
import { HeaderItem, HeaderItemType } from "@widgets/UniversalTable/lib/types";
import React from "react";

interface HeaderProps {
  header: HeaderItem;
  isIndeterminate: boolean;
  isChecked: boolean;
  toggleMainSelect: () => void;
}

export const HeaderCeil: React.FC<HeaderProps> = ({ header, isChecked, isIndeterminate, toggleMainSelect }) => {
  if (header.type === HeaderItemType.EMPTY) {
    return <TableHead></TableHead>;
  }

  if (header.type === HeaderItemType.SELECT) {
    return (
      <TableHead>
        <Checkbox onClick={toggleMainSelect} checked={isIndeterminate ? "indeterminate" : isChecked ? true : false}/>
      </TableHead>
    );
  }

  return <TableHead>{header.value}</TableHead>;
};
