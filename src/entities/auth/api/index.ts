"use server";

import { fetchInstance } from "shared/api";
import { ProfileApi } from "./types";
import { handleServerError } from "shared/error/api";

export const getCurrentProfileApi = async (): Promise<
  ProfileApi | null | undefined
> => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/auth/current`,
      {
        method: "GET",
      }
    );

    if (!response) {
      throw new Error("something happen when profile fetch");
    }
    const resJSON = await response.json();
    if (resJSON.error) {
      throw new Error(resJSON.error);
    }

    return resJSON;
  } catch (error) {
    handleServerError(error);
    return null
  }
};
