import { Checkbox } from "@components/shadowCDN/checkbox";
import { TableHead } from "@components/shadowCDN/table";
import { HeaderItem, HeaderItemType } from "@widgets/FamiliesTable/lib/types";

import React from "react";

interface HeaderProps {
  header: HeaderItem;
}

export const Header: React.FC<HeaderProps> = ({ header }) => {
  if (header.type === HeaderItemType.EMPTY) {
    return <TableHead></TableHead>;
  }

  if (header.type === HeaderItemType.SELECT) {
    return (
      <TableHead>
        <Checkbox />
      </TableHead>
    );
  }

  return <TableHead>{header.value}</TableHead>;
};
