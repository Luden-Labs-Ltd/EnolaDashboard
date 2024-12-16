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
  type: HeaderItemType;
};

export type CeilItem = {
  id: string;
  itemId: number;
  value: string | number;
  type: CeilItemType;
  itemData: Record<string, any>,
  isActive?: boolean;
};
