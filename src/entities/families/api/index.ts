"use server"
import { getAuthToken } from "entities/auth/token";
import { FamilyApi } from "./types";

export const getFamiliesFromApi = async (): Promise<FamilyApi[]> => {
  const token = await getAuthToken()
  
  const response = await fetch(
    process.env.BASE_URL_BACKEND + "/api/v2/families",
    {
      method: "GET",
      // @ts-ignore
      headers: {
        "Authorization": token
      }
    }
  );
  const resJSON = await response.json()
  return resJSON;
};
