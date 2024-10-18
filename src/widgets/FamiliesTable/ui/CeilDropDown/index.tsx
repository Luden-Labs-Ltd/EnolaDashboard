import { Button } from "@components/shadowCDN/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@components/shadowCDN/dropdown-menu";
import React, { useState } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";
import DotsIcon from "shared/assets/DotsIcon";
import ShareIcon from "shared/assets/ShareIcon";
import ViewIcon from "shared/assets/ViewIcon";
import styles from "./CeilDropDown.module.scss";
import { ArchiveFamily } from "features/archive-family";
import ArchiveIcon from "shared/assets/ArchiveIcon";
import Link from "next/link";
import { RowItem } from "@widgets/FamiliesTable/lib/types";

interface CeilDropDownProps {
  ceil: RowItem;
}

const CeilDropDown: React.FC<CeilDropDownProps> = ({ceil}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger onClick={onOpen} asChild>
        <Button size={"icon"} variant={"ghost"}>
          <DotsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={onClose}
        className={styles.DropDownWrapper}
      >
        <DropdownMenuItem >
          <Link href={`/family/${ceil.familyId}`} className={styles.DropdownMenuItem}>
            <ViewIcon />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.DropdownMenuItem}>
          <ShareIcon />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.DropdownMenuItem}>
          <DeleteIcon />
          <span>Delete</span>
        </DropdownMenuItem>

        <ArchiveFamily callback={onClose}>
          <DropdownMenuItem
            onClick={onOpen}
            className={styles.DropdownMenuItem}
          >
            <ArchiveIcon />
            <span>Archive</span>
          </DropdownMenuItem>
        </ArchiveFamily>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CeilDropDown;
