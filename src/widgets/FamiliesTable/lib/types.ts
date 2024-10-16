export enum HeaderItemType {
  VALUE = "VALUE",
  EMPTY = "EMPTY",
  SELECT = "SELECT",
}

export enum RowItemType {
  VALUE = "VALUE",
  ACTIONS = "ACTIONS",
  SELECT = "SELECT",
}

export type HeaderItem = {
  id: string;
  value: string;
  type: HeaderItemType;
};

export type RowItem = {
  id: string;
  familyId: string;
  value: string | number;
  type: RowItemType;
  isActive?: boolean;
};
