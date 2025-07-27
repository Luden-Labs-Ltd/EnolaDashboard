"use server";

import { getAnalytics } from "./api/analitycs";
import { AnalyticsFilters } from "./model/types";
import { getCurrentProgramId } from "entities/program";

export const getAnalyticsWithFilters = async (filters?: AnalyticsFilters) => {
  const programId = await getCurrentProgramId();
  return await getAnalytics(programId, filters);
};