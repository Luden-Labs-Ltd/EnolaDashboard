export type Sort = "asc" | "desc";
export type SortType = "number" | "text" | "date";


export type SorterObject = Record<
  string,
  {
    isSortAvailable: boolean;
    apiName: string;
    availableSorts: Sort[];
    sortType: SortType,
  }
>;
