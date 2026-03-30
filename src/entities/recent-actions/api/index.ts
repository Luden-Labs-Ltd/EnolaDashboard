"use server";

import { fetchInstance } from "shared/api";
import { RecentAction } from "../model/types";

export const getRecentActionsByFamilyId = async (
  familyId: number | string
): Promise<RecentAction[] | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}/recent_actions`,
    {
      method: "GET",
    }
  );

  if (!response) {
    return null;
  }

  return response.json();
};
