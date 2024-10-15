import React from "react";

import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableCell } from "@components/shadowCDN/table";
import { RowItem, RowItemType } from "@widgets/FamiliesTable/lib/types";
import CeilDropDown from "../CeilDropDown";

interface CeilProps {
  ceil: RowItem;
}

export const Ceil: React.FC<CeilProps> = ({ ceil }) => {
  if (ceil.type === RowItemType.SELECT) {
    return (
      <TableCell>
        <Checkbox />
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
