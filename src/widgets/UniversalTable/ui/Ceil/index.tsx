import React from "react";

import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableCell } from "@components/shadowCDN/table";
import { CeilItem, CeilItemType } from "@widgets/UniversalTable/lib/types";
import CeilDropDown from "../CeilDropDown";
import { DropDownMenuItemsType } from "@components/DropDownMenu";

export type renderCeilDropDownItemsType = (ceil: CeilItem) => DropDownMenuItemsType[]
interface CeilProps {
  ceil: CeilItem;
  toggleSelectedItems: (id: string) => void;
  renderCeilDropDownItems: renderCeilDropDownItemsType;
}

export const Ceil: React.FC<CeilProps> = ({ ceil, toggleSelectedItems, renderCeilDropDownItems }) => {
  if (ceil.type === CeilItemType.SELECT) {
    return (
      <TableCell>
        <Checkbox className="border-primary" checked={ceil.isActive} onClick={() => toggleSelectedItems(ceil.itemId)} />
      </TableCell>
    );
  }

  if (ceil.type === CeilItemType.ACTIONS) {
    return (
      <TableCell>
        <CeilDropDown ceilDropDownItems={renderCeilDropDownItems(ceil)} ceil={ceil} />
      </TableCell>
    );
  }
  return <TableCell>{ceil.value}</TableCell>;
};
