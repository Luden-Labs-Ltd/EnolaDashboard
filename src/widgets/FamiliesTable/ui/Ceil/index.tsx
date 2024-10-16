import React from "react";

import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableCell } from "@components/shadowCDN/table";
import { RowItem, RowItemType } from "@widgets/FamiliesTable/lib/types";
import CeilDropDown from "../CeilDropDown";
import { useFamiliesStore } from "entities/families";

interface CeilProps {
  ceil: RowItem;
}

export const Ceil: React.FC<CeilProps> = ({ ceil }) => {
  const {toggleSelectedFamilies} = useFamiliesStore()
  if (ceil.type === RowItemType.SELECT) {
    return (
      <TableCell>
        <Checkbox checked={ceil.isActive} onClick={() => toggleSelectedFamilies(ceil.familyId)} />
      </TableCell>
    );
  }

  if (ceil.type === RowItemType.ACTIONS) {
    return (
      <TableCell>
        <CeilDropDown />
      </TableCell>
    );
  }
  return <TableCell>{ceil.value}</TableCell>;
};
