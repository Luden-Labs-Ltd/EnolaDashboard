"use client";
import React, { useState } from "react";
import Chart from "../../ui/Chart/Chart";
import Filters, { FilterItem } from "./Filters/Filters";
import { addDays } from "date-fns";
import { DateRangeItem } from "../../ui/DateRange/DateRangePicker";

export type FilterStateType = {
  activeItemsFilters: Array<string>;
  days: Array<DateRangeItem>;
};

const CharWithFilters = () => {
  const currentDate = new Date("12/09/2000");
  const [filters, setFilters] = useState<FilterStateType>({
    activeItemsFilters: [],
    days: [
      {
        startDate: currentDate,
        endDate: addDays(currentDate, 7),
        key: "selection",
      },
    ],
  });

  const filtersItems: Array<FilterItem> = [
    {
      label: "Active Users",
      id: "active_user",
      color: "primary",
    },
    {
      label: "Families",
      id: "families",
      color: "secondary",
    },
    {
      label: "Supporters",
      id: "supporters",
      color: "warning",
    },
    {
      label: "Open Tasks",
      id: "open_tasks",
      color: "success",
    },
    {
      label: "Completed Tasks",
      id: "completed_tasks",
      color: "error",
    },
  ];

  const onChangeItemFilter = (filterId: string) => {
    setFilters((prev) => {
      if (prev.activeItemsFilters.includes(filterId)) {
        const filteredItems = prev.activeItemsFilters.filter(
          (id) => id !== filterId
        );
        return {
          ...prev,
          activeItemsFilters: filteredItems,
        };
      }
      const newActiveItems = [...prev.activeItemsFilters, filterId];
      return {
        ...prev,
        activeItemsFilters: newActiveItems,
      };
    });
  };

  const onChangeDate = (newDates: Array<DateRangeItem>) => {
    console.log(newDates);
  };

  return (
    <div>
      <Filters
        filtersItems={filtersItems}
        filterState={filters}
        onChangeItemFilter={onChangeItemFilter}
        onChangeDate={onChangeDate}
      />
      <Chart />
    </div>
  );
};

export default CharWithFilters;
