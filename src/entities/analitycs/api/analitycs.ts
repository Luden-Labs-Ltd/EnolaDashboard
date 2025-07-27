"use server";
import { fetchInstance } from "shared/api";
import { GET_ANALITYCS_TAG } from "./const";
import { AnalyticsData, AnalyticsFilters } from "../model/types";

export const getAnalytics = async (
  programId: number | string,
  filters?: AnalyticsFilters
): Promise<AnalyticsData | null> => {
  const queryParams: any = {};

  if (filters?.date_gteq) {
    queryParams.date_gteq = filters.date_gteq;
  }

  if (filters?.date_lteq) {
    queryParams.date_lteq = filters.date_lteq;
  }

  const params = JSON.stringify(queryParams);

  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/analytics?q=${params}`,
    {
      method: "GET",
      next: {
        tags: [GET_ANALITYCS_TAG],
      },
    }
  );

  if (!response) {
    return null;
  }

  const resJSON = await response.json();
  return resJSON;
};
