import React from "react";

import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableCell } from "@components/shadowCDN/table";
import { RowItem, RowItemType } from "@widgets/UniversalTable/lib/types";
import CeilDropDown from "../CeilDropDown";
import { DropDownMenuItemsType } from "@components/DropDownMenu";

export type renderCeilDropDownItemsType = (ceil: RowItem) => DropDownMenuItemsType[]
interface CeilProps {
  ceil: RowItem;
  toggleSelectedItems: (id: number) => void;
  renderCeilDropDownItems: renderCeilDropDownItemsType;
}

export const Ceil: React.FC<CeilProps> = ({ ceil, toggleSelectedItems, renderCeilDropDownItems }) => {
  if (ceil.type === RowItemType.SELECT) {
    return (
      <TableCell>
        <Checkbox checked={ceil.isActive} onClick={() => toggleSelectedItems(ceil.itemId)} />
      </TableCell>
    );
  }

  if (ceil.type === RowItemType.ACTIONS) {
    return (
      <TableCell>
        <CeilDropDown ceilDropDownItems={renderCeilDropDownItems(ceil)} ceil={ceil} />
      </TableCell>
    );
  }
  return <TableCell>{ceil.value}</TableCell>;
};
