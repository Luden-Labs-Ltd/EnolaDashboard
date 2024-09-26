"use client";
import React, { useState } from "react";
import Chart from "../../ui/Chart/Chart";
import Filters, { FilterItem } from "./Filters/Filters";

export type FilterStateType = {
  activeItemsFilters: Array<string>;
  currentDate: Date;
};

const CharWithFilters = () => {
  const [filters, setFilters] = useState<FilterStateType>({
    activeItemsFilters: [],
    currentDate: new Date(),
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
      const newActiveItems = [...prev.activeItemsFilters, filterId]
      return {
        ...prev,
        activeItemsFilters: newActiveItems,
      };
    });
  };

  return (
    <div>
      <Filters
        filtersItems={filtersItems}
        filterState={filters}
        onChangeItemFilter={onChangeItemFilter}
      />
      <Chart />
    </div>
  );
};

export default CharWithFilters;
