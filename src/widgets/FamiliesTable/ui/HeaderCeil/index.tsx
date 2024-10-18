import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableHead } from "@components/shadowCDN/table";
import { HeaderItem, HeaderItemType } from "@widgets/FamiliesTable/lib/types";
import { useFamiliesStore } from "entities/families";

import React from "react";

interface HeaderProps {
  header: HeaderItem;
}

export const HeaderCeil: React.FC<HeaderProps> = ({ header }) => {
  const {familiesState, toggleMainSelect} = useFamiliesStore()

  const isIndeterminate = familiesState.selectedFamilies.length > 0 && familiesState.selectedFamilies.length !== familiesState.families.length
  const isChecked = familiesState.selectedFamilies.length === familiesState.families.length
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
