import DropDownMenu, { DropDownMenuItemsType } from "@components/DropDownMenu";
import React from "react";
import { RowItem } from "@widgets/UniversalTable/lib/types";
import "./CeilDropDow.css";

interface CeilDropDownProps {
  ceil: RowItem;
  ceilDropDownItems: DropDownMenuItemsType[];
}

const CeilDropDown: React.FC<CeilDropDownProps> = ({ceilDropDownItems }) => {
  return <DropDownMenu items={ceilDropDownItems} />;
};

export default CeilDropDown;
