import React, { useState } from "react";
import styles from "./Category.module.scss";
import { PropsWithChildren } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils";
import {
  MessageIcon,
  MedicalIcon,
  EmotionalIcon,
  ParentingIcon,
  RightIcon,
  HomeIcon,
} from "shared/assets/categoryIcon";
import { CategoryIconType } from "entities/category/model";
import { color } from "echarts";

export type CategoryPressCallbackArguments = {
  isActive: boolean;
  id: string;
};

const categoryVariants = cva(`${styles.wrapper}`, {
  variants: {
    size: {
      default: "h-10 px-4 py-2",
      md: "h-12 py-3 px-6",
    },
    radius: {
      default: "",
      md: "rounded-lg",
    },
  },
  defaultVariants: {
    size: "default",
    radius: "default",
  },
});

export interface CategoriesProps
  extends VariantProps<typeof categoryVariants> {}
export interface CategoriesProps {
  title: string;
  id: string;
  iconType: CategoryIconType;
  customIcon?: React.ReactNode;
  active?: boolean;
  variant?: "default" | "chip";
  color?: "primary" | "secondary";
  count?: number;
  isPresseble?: boolean;
  pressCallback?: (argue: CategoryPressCallbackArguments) => void;
}


export const ICON_MAP: { [key: string]: React.ReactNode } = {
  general: <MessageIcon />,
  medical: <MedicalIcon />,
  home: <HomeIcon />,
  emotional: <EmotionalIcon />,
  childcare: <ParentingIcon />,
  legal_rights: <RightIcon />,
};

const Category: React.FC<PropsWithChildren<CategoriesProps>> = ({
  size,
  customIcon,
  title,
  id,
  active,
  radius,
  iconType,
  color = "primary",
  variant = "default",
  count,
  isPresseble = false,
  pressCallback,
}) => {
  const isChip = variant === "chip";
  const handlePress = () => {
    if (!isPresseble) {
      return;
    }
    const newState = !active;
    pressCallback?.({
      id: id,
      isActive: newState,
    });
  };

  const defaultIcon = ICON_MAP[iconType];
  const icon = customIcon ? customIcon : defaultIcon;
  return (
    <div
      onClick={handlePress}
      className={cn(categoryVariants({ size, radius }), {
        [styles.active]: active,
        [styles.chip]: isChip,
        [styles.secondary]: color === "secondary",
      })}
    >
      {icon ? <div>{icon}</div> : null}
      <div>{title}</div>
      {count ? <div>{count}</div> : null}
      {/* {isChip ? <div>x</div> : null} */}
    </div>
  );
};

export default Category;
