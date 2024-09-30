"use client";

import React from "react";
import FilterButton from "../FilterButton/FilterButton";
import { ButtonOwnProps } from "@mui/material";
import { FilterStateType } from "../CharWithFilters";
import "react-date-range/dist/styles.css"; // main css file
import dynamic from "next/dynamic";
import {
  DatepickerSkeletton,
  DateRangeItem,
} from "../../../ui/DateRange/DateRangePicker";

const DateRangePicker = dynamic(
  () => import("../../../ui/DateRange/DateRangePicker"),
  {
    ssr: false,
    loading: () => {
      return <DatepickerSkeletton />;
    },
  }
);

export type FilterItem = {
  label: string;
  id: string;
  color: ButtonOwnProps["color"];
};

interface FiltersItems {
  filterState: FilterStateType;
  filtersItems: Array<FilterItem>;
  onChangeItemFilter: (filterId: string) => void;
  onChangeDate: (dates: Array<DateRangeItem>) => void;
}

const Filters: React.FC<FiltersItems> = ({
  filtersItems,
  filterState,
  onChangeItemFilter,
  onChangeDate,
}) => {
  return (
    <div className="flex gap-5 items-center justify-between flex-row mt-7 mb-7">
      <div>
        <DateRangePicker onChangeDate={onChangeDate} dates={filterState.days} />
      </div>
      <div className="flex gap-5 flex-wrap items-center">
        {filtersItems.map((item) => {
          return (
            <FilterButton
              key={item.id}
              color={item.color}
              variant={
                filterState.activeItemsFilters.includes(item.id)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => onChangeItemFilter(item.id)}
            >
              {item.label}
            </FilterButton>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
