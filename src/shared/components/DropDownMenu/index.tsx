"use client";

import { Button } from "@components/shadowCDN/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@components/shadowCDN/dropdown-menu";
import React, { ReactNode, useState } from "react";
import DotsIcon from "shared/assets/DotsIcon";
import styles from "./DropDownMenu.module.scss";
import Link from "next/link";
import "./DropDownItem.css";

export type DropDownMenuItemsType = {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  renderCustomComponent?: (onOpen: () => void, onClose: () => void) => ReactNode;
};

interface DropDownMenuProps {
  items: DropDownMenuItemsType[];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ items }) => {
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
        className={`${styles.DropDownWrapper} DropDownWrapper`}
      >
        {items.map((item) => {
          if (item.renderCustomComponent) {
            return item.renderCustomComponent(onOpen, onClose);
          }
          return (
            <DropdownMenuItem key={item.id}>
              <Link href={item.href} className={styles.DropdownMenuItem}>
                {item.icon}
                <span>
                    {item.label}
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
