"use client";
import { addDays, isWithinInterval } from "date-fns";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { DateRangeItem } from "@components/DateRange/DateRangePicker";
import Filters, { FilterItem } from "../Filters/Filters";

export type FilterStateType = {
  activeItemsFilters: Array<string>;
  days: Array<DateRangeItem>;
};

type BaseLineData = {
  data: { value: number; date: Date }[];
  id: string;
  color: string;
};

type Filters = {
  minDate: Date | null;
  maxDate: Date | null;
  activeFilters: string[];
};

type CreateCharDataArguments = {
  originData: BaseLineData[];
  filters: Filters;
};

type lineObject = {
  name: string;
  data: {
    value: number;
    date: Date;
  }[];
  type: string;
  stack: string;
  symbolSize: number;
  lineStyle: {
    normal: {
      color: string;
      width: number;
      type: string;
    };
  };
};

type CreateBaseLineObject = {
  item: BaseLineData;
  minDate: Date | null;
  maxDate: Date | null;
};
const createBaseLineObject = ({
  item,
  minDate,
  maxDate,
}: CreateBaseLineObject) => {
  const { data, id, color } = item;
  const dataArray = data.filter((item) => {
    if (!minDate || !maxDate) {
      return true;
    }
    const isBetween = isWithinInterval(item.date, {
      start: minDate,
      end: maxDate,
    });

    return isBetween;
  });
  const lineObject = {
    name: id,
    data: dataArray,
    type: "line",
    stack: "x",
    symbolSize: 10,
    lineStyle: {
      normal: {
        color: color,
        width: 4,
        type: "solid",
      },
    },
  };
  return lineObject;
};

const createCharData = ({ originData, filters }: CreateCharDataArguments) => {
  let filteredData = originData;
  if (filters.activeFilters.length) {
    filteredData = originData.filter((item) =>
      filters.activeFilters.includes(item.id)
    );
  }

  const result: lineObject[] = [];
  filteredData.forEach((item) => {
    const chartLineObject = createBaseLineObject({
      item: item,
      minDate: filters.minDate,
      maxDate: filters.maxDate,
    });
    if (chartLineObject) {
      result.push(chartLineObject);
    }
  });

  return result;
};

const Echarts = dynamic(() => import("@components/Chart/Echarts"), {
  ssr: false,
  loading: () => {
    return <div>loading</div>;
  },
});

const CharWithFilters = () => {
  const [filters, setFilters] = useState<FilterStateType>({
    activeItemsFilters: [],
    days: [
      {
        startDate: null,
        endDate: null,
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

  const ChartData = useMemo(() => {
    const data = createCharData({
      originData: [
        {
          data: [
            { value: 10, date: new Date(2024, 8, 1) },
            { value: 22, date: new Date(2024, 8, 2) },
            { value: 28, date: new Date(2024, 8, 3) },
            { value: 43, date: new Date(2024, 8, 4) },
            { value: 48, date: new Date(2024, 8, 5) },
          ],
          id: "active_user",
          color: "#269ACF",
        },
        {
          data: [
            { value: 15, date: new Date(2024, 9, 1) },
            { value: 14, date: new Date(2024, 9, 2) },
            { value: 13, date: new Date(2024, 9, 3) },
            { value: 30, date: new Date(2024, 9, 4) },
            { value: 14, date: new Date(2024, 9, 5) },
            { value: 19, date: new Date(2024, 9, 6) },
          ],
          id: "families",
          color: "purple",
        },
        {
          data: [
            {
              value: 12,
              date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 50,
              date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 30,
              date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 2,
              date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 45,
              date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1),
            },
          ],
          id: "supporters",
          color: "orange",
        },
        {
          data: [
            {
              value: 5,
              date: new Date(2024, 3, Math.floor(Math.random() * 30) + 1),
            },
            {
              value: 4,
              date: new Date(2024, 3, Math.floor(Math.random() * 30) + 1),
            },
            {
              value: 3,
              date: new Date(2024, 3, Math.floor(Math.random() * 30) + 1),
            },
            {
              value: 5,
              date: new Date(2024, 3, Math.floor(Math.random() * 30) + 1),
            },
            {
              value: 10,
              date: new Date(2024, 3, Math.floor(Math.random() * 30) + 1),
            },
          ],
          id: "open_tasks",
          color: "green",
        },
        {
          data: [
            {
              value: 10,
              date: new Date(2024, 4, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 15,
              date: new Date(2024, 4, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 18,
              date: new Date(2024, 4, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 10,
              date: new Date(2024, 4, Math.floor(Math.random() * 31) + 1),
            },
            {
              value: 30,
              date: new Date(2024, 4, Math.floor(Math.random() * 31) + 1),
            },
          ],
          id: "completed_tasks",
          color: "red",
        },
      ],
      filters: {
        activeFilters: filters.activeItemsFilters,
        minDate: filters.days[0]?.startDate,
        maxDate: filters.days[0]?.endDate,
      },
    });

    return data;
  }, [filters]);

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
    setFilters((prev) => {
      return {
        ...prev,
        days: newDates,
      };
    });
  };

  return (
    <div>
      <Filters
        filtersItems={filtersItems}
        filterState={filters}
        onChangeItemFilter={onChangeItemFilter}
        onChangeDate={onChangeDate}
      />
      <Echarts
        loading={false}
        options={{
          tooltip: {
            trigger: "item",
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: ChartData,
        }}
      />
    </div>
  );
};

export default CharWithFilters;
