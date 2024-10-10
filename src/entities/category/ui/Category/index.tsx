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
  customIcon?: React.ReactNode;
  active?: boolean;
  isPresseble?: boolean;
  pressCallback?: (argue: CategoryPressCallbackArguments) => void;
}

const Category: React.FC<PropsWithChildren<CategoriesProps>> = ({
  size,
  customIcon,
  title,
  id,
  active,
  radius,
  isPresseble = false,
  pressCallback,
}) => {
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

  const iconMap: { [key: string]: React.ReactNode } = {
    general: <MessageIcon />,
    medical: <MedicalIcon />,
    home: <HomeIcon />,
    emotional: <EmotionalIcon />,
    childcare: <ParentingIcon />,
    legal_rights: <RightIcon />,
  };

  const defaultIcon = iconMap[id];

  return (
    <div
      onClick={handlePress}
      className={cn(categoryVariants({ size, radius }), {
        [styles.active]: active,
      })}
    >
      <div>{customIcon ? customIcon : defaultIcon}</div>
      <div>{title}</div>
    </div>
  );
};

export default Category;
