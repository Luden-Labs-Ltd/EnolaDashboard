"use server";
import { FamilyApi } from "./types";
import { fetchInstance } from "shared/api";

export const getFamiliesFromApi = async (): Promise<FamilyApi[]> => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + "/api/v2/families",
    {
      method: "GET",
    }
  );

  if (!response) {
    return [];
  }

  const resJSON = await response.json();
  return resJSON;
};

export const getFamilyById = async (
  familyId: string
): Promise<FamilyApi | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/families/${familyId}`,
    {
      method: "GET",
    }
  );

  if (!response) {
    return null;
  }

  const resJSON = await response.json();
  return resJSON;
};
