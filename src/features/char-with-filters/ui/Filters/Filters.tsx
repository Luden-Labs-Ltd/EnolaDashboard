"use client";

import React from "react";
import FilterButton, { FilterColors } from "../FilterButton/FilterButton";
import "react-date-range/dist/styles.css"; // main css file
import dynamic from "next/dynamic";
import {
  DatepickerSkeletton,
  DateRangeItem,
} from "@components/DateRange/DateRangePicker";
import { FilterStateType } from "../CharWithFilter";

const DateRangePicker = dynamic(
  () => import("@components/DateRange/DateRangePicker"),
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
  color: FilterColors;
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
                  ? "active"
                  : "disabled"
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
