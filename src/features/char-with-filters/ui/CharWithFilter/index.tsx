"use client";
import { isWithinInterval } from "date-fns";
import dynamic from "next/dynamic";
import { useMemo, useState, useCallback, useEffect } from "react";
import { DateRangeItem } from "@components/DateRange/DateRangePicker";
import Filters, { FilterItem } from "../Filters/Filters";
import { useLocale, useTranslations } from "next-intl";
import { AnalyticsData, getAnalyticsWithFilters, AnalyticsFilters, useAnalyticsStore } from "entities/analitycs";

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
  stack?: string;
  symbolSize: number;
  lineStyle: {
    color: string;
    width: number;
    type: string;
  };
};

type CreateBaseLineObject = {
  item: BaseLineData;
  minDate: Date | null;
  maxDate: Date | null;
};

interface CharWithFiltersProps {
  analyticsData: AnalyticsData | null;
  onDataChange?: (data: AnalyticsData | null) => void;
}

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
    symbolSize: 10,
    lineStyle: {
      color: color,
      width: 4,
      type: "solid",
    },
  };
  return lineObject;
};

const createCharData = ({ originData, filters }: CreateCharDataArguments) => {
  let filteredData = originData;

  // If there are active filters, show only those. If no active filters, show nothing.
  if (filters.activeFilters.length > 0) {
    filteredData = originData.filter((item) =>
      filters.activeFilters.includes(item.id)
    );
  } else {
    // When no filters are active, show no data
    filteredData = [];
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

// Transform analytics data to chart format
const transformAnalyticsToChartData = (analyticsData: AnalyticsData | null): BaseLineData[] => {
  if (!analyticsData) return [];

  const result: BaseLineData[] = [];

  // Transform families data from activity array
  if (analyticsData.families?.activity && Array.isArray(analyticsData.families.activity)) {
    const familiesData = analyticsData.families.activity.map((item) => ({
      value: item.count,
      date: new Date(item.date)
    }));

    result.push({
      data: familiesData,
      id: "families",
      color: "#3B82F6" // Blue to match primary filter button
    });
  }

  // Transform supporters data from activity array
  if (analyticsData.supporters?.activity && Array.isArray(analyticsData.supporters.activity)) {
    const supportersData = analyticsData.supporters.activity.map((item) => ({
      value: item.count,
      date: new Date(item.date)
    }));

    result.push({
      data: supportersData,
      id: "supporters",
      color: "#CA8A04" // Yellow to match warning filter button
    });
  }

  // Transform tasks data from activity arrays
  if (analyticsData.tasks?.activity) {
    // Transform opened tasks
    if (analyticsData.tasks.activity.opened && Array.isArray(analyticsData.tasks.activity.opened)) {
      const openTasksData = analyticsData.tasks.activity.opened.map((item) => ({
        value: item.count,
        date: new Date(item.date)
      }));

      result.push({
        data: openTasksData,
        id: "open_tasks",
        color: "#22C55E" // Green to match success filter button
      });
    }

    // Transform closed tasks
    if (analyticsData.tasks.activity.closed && Array.isArray(analyticsData.tasks.activity.closed)) {
      const completedTasksData = analyticsData.tasks.activity.closed.map((item) => ({
        value: item.count,
        date: new Date(item.date)
      }));

      result.push({
        data: completedTasksData,
        id: "completed_tasks",
        color: "#8B5CF6" // Violet to match error filter button
      });
    }
  }

  return result;
};

const Echarts = dynamic(() => import("@components/Chart/Echarts"), {
  ssr: false,
  loading: () => {
    return <div>loading</div>;
  },
});

const CharWithFilters = () => {
  const t = useTranslations();
  const appLocale = useLocale();
  const { analyticsState, updateAnalyticsData, setLoading } = useAnalyticsStore();

  // Set default date range to last + current week from Sunday to today using useMemo to prevent recreation
  const defaultDates = useMemo(() => {
    const today = new Date();
    const sunday = new Date(today);
    // Set to the most recent Sunday (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = today.getDay();
    sunday.setDate(today.getDate() - dayOfWeek - 7);
    return { sunday, today };
  }, []);

  const [filters, setFilters] = useState<FilterStateType>({
    activeItemsFilters: ["families", "supporters", "open_tasks", "completed_tasks"],
    days: [
      {
        startDate: defaultDates.sunday,
        endDate: defaultDates.today,
        key: "selection",
      },
    ],
  });

  const filtersItems: Array<FilterItem> = [
    {
      label: t("Dashboard.filters.families"),
      id: "families",
      color: "primary",
    },
    {
      label: t("Dashboard.filters.supporters"),
      id: "supporters",
      color: "warning",
    },
    {
      label: t("Dashboard.filters.openTasks"),
      id: "open_tasks",
      color: "success",
    },
    {
      label: t("Dashboard.filters.completedTasks"),
      id: "completed_tasks",
      color: "error",
    },
  ];

  const ChartData = useMemo(() => {
    const transformedData = transformAnalyticsToChartData(analyticsState.analyticsData);

    const data = createCharData({
      originData: transformedData,
      filters: {
        activeFilters: filters.activeItemsFilters,
        minDate: filters.days[0]?.startDate,
        maxDate: filters.days[0]?.endDate,
      },
    });

    return data;
  }, [filters, analyticsState.analyticsData]);

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

  const onChangeDate = useCallback(async (newDates: Array<DateRangeItem>) => {
    setFilters((prev) => ({
      ...prev,
      days: newDates,
    }));

    // Fetch new data when date range changes
    const startDate = newDates[0]?.startDate;
    const endDate = newDates[0]?.endDate;

    if (startDate || endDate) {
      const filters: AnalyticsFilters = {};

      if (startDate) {
        filters.date_gteq = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }

      if (endDate) {
        filters.date_lteq = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }

      try {
        setLoading(true);
        const newData = await getAnalyticsWithFilters(filters);
        updateAnalyticsData(newData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // If no date range is selected, fetch all data
      try {
        setLoading(true);
        const newData = await getAnalyticsWithFilters();
        updateAnalyticsData(newData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [updateAnalyticsData, setLoading]);

  // Get unique dates for x-axis from date range filters
  const xAxisData = useMemo(() => {
    const startDate = filters.days[0]?.startDate;
    const endDate = filters.days[0]?.endDate;

    if (!startDate || !endDate) {
      // If no date range is selected, return empty array
      return [];
    }

    const dates: string[] = [];
    const browserLocale =
      appLocale === "he" ? "he-IL" : appLocale === "ru" ? "ru-RU" : "en-US";
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    // Generate dates for each day in the range
    while (currentDate <= lastDate) {
      dates.push(
        currentDate.toLocaleDateString(browserLocale, { weekday: "short" })
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, [filters.days, appLocale]);

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      const filters: AnalyticsFilters = {
        date_gteq: defaultDates.sunday.toISOString().split('T')[0], // Sunday
        date_lteq: defaultDates.today.toISOString().split('T')[0], // Today
      };

      try {
        setLoading(true);
        const newData = await getAnalyticsWithFilters(filters);
        updateAnalyticsData(newData);
      } catch (error) {
        console.error('Failed to fetch initial analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [defaultDates.sunday, defaultDates.today, updateAnalyticsData, setLoading]);

  return (
    <div>
      <Filters
        filtersItems={filtersItems}
        filterState={filters}
        onChangeItemFilter={onChangeItemFilter}
        onChangeDate={onChangeDate}
      />
      <Echarts
        loading={analyticsState.isLoading}
        options={{
          tooltip: {
            trigger: "item",
          },
          legend: {
            data: ChartData.map(series => series.name),
            top: 10,
          },
          xAxis: {
            type: "category",
            data: xAxisData,
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
