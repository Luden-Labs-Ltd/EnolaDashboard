import DropDownMenu, { DropDownMenuItemsType } from "@components/DropDownMenu";
import { RowItem } from "@widgets/FamiliesTable/lib/types";
import { ArchiveFamily } from "features/archive-family";
import React from "react";
import ArchiveIcon from "shared/assets/ArchiveIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import ShareIcon from "shared/assets/ShareIcon";
import ViewIcon from "shared/assets/ViewIcon";
import styles from "./CeilDropDown.module.scss";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";

interface CeilDropDownProps {
  ceil: RowItem;
}

const CeilDropDown: React.FC<CeilDropDownProps> = ({ ceil }) => {
  const ceilDropDownItems: DropDownMenuItemsType[] = [
    {
      id: `${ceil.familyId}-view`,
      label: "View",
      icon: <ViewIcon />,
      href: `/family/${ceil.familyId}`,
    },
    {
      id: `${ceil.familyId}-share`,
      label: "Share",
      icon: <ShareIcon />,
      href: ``,
    },
    {
      id: `${ceil.familyId}-delete`,
      label: "Delete",
      icon: <DeleteIcon />,
      href: ``,
    },
    {
      id: `${ceil.familyId}-archive`,
      label: '',
      icon: '',
      href: ``,
      renderCustomComponent: (onOpen, onClose) => {
        return (
          <ArchiveFamily key={`${ceil.familyId}-archive`} callback={onClose}>
            <DropdownMenuItem
              onClick={onOpen}
              className={styles.DropdownMenuItem}
            >
              <ArchiveIcon />
              <span>Archive</span>
            </DropdownMenuItem>
          </ArchiveFamily>
        );
      },
    },
  ];
  return <DropDownMenu items={ceilDropDownItems} />;
};

export default CeilDropDown;
