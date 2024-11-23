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
import { useTranslations } from "next-intl";
import { DeleteFamily } from "features/delete-family";

interface CeilDropDownProps {
  ceil: RowItem;
}

const CeilDropDown: React.FC<CeilDropDownProps> = ({ ceil }) => {
  const t = useTranslations();

  const ceilDropDownItems: DropDownMenuItemsType[] = [
    {
      id: `${ceil.familyId}-view`,
      label: t("Common.view"),
      icon: <ViewIcon />,
      href: `/family/${ceil.familyId}`,
    },
    {
      id: `${ceil.familyId}-share`,
      label: t("Common.share"),
      icon: <ShareIcon />,
      href: ``,
    },
    {
      id: `${ceil.familyId}-delete`,
      label: t("Common.delete"),
      icon: "",
      href: ``,
      renderCustomComponent: (onOpen, onClose) => {
        return (
          <DeleteFamily key={`${ceil.familyId}-delete`} familyId={ceil.familyId} callback={onClose}>
            <DropdownMenuItem
              onClick={onOpen}
              className={styles.DropdownMenuItem}
            >
              <DeleteIcon />
              <span>{t("Common.delete")}</span>
            </DropdownMenuItem>
          </DeleteFamily>
        );
      },
    },
    {
      id: `${ceil.familyId}-archive`,
      label: "",
      icon: "",
      href: ``,
      renderCustomComponent: (onOpen, onClose) => {
        return (
          <ArchiveFamily key={`${ceil.familyId}-archive`} callback={onClose}>
            <DropdownMenuItem
              onClick={onOpen}
              className={styles.DropdownMenuItem}
            >
              <ArchiveIcon />
              <span>{t("Families.archive")}</span>
            </DropdownMenuItem>
          </ArchiveFamily>
        );
      },
    },
  ];
  return <DropDownMenu items={ceilDropDownItems} />;
};

export default CeilDropDown;
