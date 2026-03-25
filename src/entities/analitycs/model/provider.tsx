"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AnalyticsData, AnalyticsFilters } from "./types";

type AnalyticsContextState = {
  analyticsData: AnalyticsData | null;
  filters: AnalyticsFilters;
  activeFilters: string[];
  isLoading: boolean;
};

type AnalyticsProviderValue = {
  analyticsData: AnalyticsData | null;
};

const AnalyticsContext = createContext<{
  analyticsState: AnalyticsContextState;
  setData: Dispatch<SetStateAction<AnalyticsContextState>>;
} | null>(null);

export const AnalyticsStoreProvider: React.FC<
  PropsWithChildren<AnalyticsProviderValue>
> = ({ analyticsData, children }) => {
  const [analyticsState, setAnalyticsState] = useState<AnalyticsContextState>({
    analyticsData: analyticsData,
    filters: {},
    activeFilters: ["families", "supporters", "open_tasks", "completed_tasks"],
    isLoading: false,
  });

  useEffect(() => {
    setAnalyticsState((prev) => ({ ...prev, analyticsData }));
  }, [analyticsData]);

  return (
    <AnalyticsContext.Provider
      value={{
        analyticsState: analyticsState,
        setData: setAnalyticsState,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsStore = () => {
  const analyticsContext = useContext(AnalyticsContext);

  if (!analyticsContext) {
    throw new Error(
      "analyticsContext has to be used within <AnalyticsStoreProvider>"
    );
  }
  const { analyticsState, setData } = analyticsContext;

  const setFilters = (filters: AnalyticsFilters) => {
    setData((prev) => ({ ...prev, filters }));
  };

  const setActiveFilters = (activeFilters: string[]) => {
    setData((prev) => ({ ...prev, activeFilters }));
  };

  const toggleFilter = (filterId: string) => {
    setData((prev) => {
      if (prev.activeFilters.includes(filterId)) {
        const filteredItems = prev.activeFilters.filter((id) => id !== filterId);
        return { ...prev, activeFilters: filteredItems };
      }
      const newActiveItems = [...prev.activeFilters, filterId];
      return { ...prev, activeFilters: newActiveItems };
    });
  };

  const setLoading = useCallback((isLoading: boolean) => {
    setData((prev) => ({ ...prev, isLoading }));
  }, [setData]);

  const updateAnalyticsData = useCallback((data: AnalyticsData | null) => {
    setData((prev) => ({ ...prev, analyticsData: data }));
  }, [setData]);

  return {
    analyticsState,
    setFilters,
    setActiveFilters,
    toggleFilter,
    setLoading,
    updateAnalyticsData,
  };
};
