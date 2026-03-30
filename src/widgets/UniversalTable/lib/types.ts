import { Sort, SortType } from "shared/types/sort";

export enum HeaderItemType {
  VALUE = "VALUE",
  EMPTY = "EMPTY",
  SELECT = "SELECT",
}

export enum CeilItemType {
  VALUE = "VALUE",
  ACTIONS = "ACTIONS",
  SELECT = "SELECT",
}

export type HeaderItem = {
  id: string;
  value: string;
  translate?: string;
  type: HeaderItemType;
};

export type CeilItem = {
  id: string;
  columnId: string;
  itemId: string;
  value: string | number;
  type: CeilItemType;
  itemData: Record<string, any>;
  isActive?: boolean;
};
