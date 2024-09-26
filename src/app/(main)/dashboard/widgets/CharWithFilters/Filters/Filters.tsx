import React from "react";
import FilterButton from "../FilterButton/FilterButton";
import { ButtonOwnProps } from "@mui/material";
import { FilterStateType } from "../CharWithFilters";

export type FilterItem = {
  label: string;
  id: string;
  color: ButtonOwnProps["color"];
};

interface FiltersItems {
  filterState: FilterStateType;
  filtersItems: Array<FilterItem>;
  onChangeItemFilter: (filterId: string) => void;
}

const Filters: React.FC<FiltersItems> = ({
  filtersItems,
  filterState,
  onChangeItemFilter,
}) => {
  return (
    <div className="flex gap-5 items-center justify-between flex-row mt-7 mb-7">
      <div>Datepicker</div>
      <div className="flex gap-5 items-center">
        {filtersItems.map((item) => {
          return (
            <>
              <FilterButton
                color={item.color}
                variant={filterState.activeItemsFilters.includes(item.id) ? "contained" : "outlined"}
                onClick={() => onChangeItemFilter(item.id)}
              >
                {item.label}
              </FilterButton>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
