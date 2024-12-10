"use server";

import { fetchInstance } from "shared/api";
import { ProfileApi } from "./types";

export const getCurrentProfileApi = async (): Promise<ProfileApi | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/auth/current`,
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
