"use server";
import { GET_FAMILIES_REVALIDATE_TAG } from "./const";
import { FamilyApi } from "./types";
import { fetchInstance } from "shared/api";

export const getFamiliesFromApi = async (): Promise<FamilyApi[]> => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + "/api/v2/families",
    {
      method: "GET",
      next: {
        tags: [GET_FAMILIES_REVALIDATE_TAG]
      }
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


export const deleteFamilyById = async (
  familyId: string
): Promise<Boolean | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/families/${familyId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteFamilyApi");
  }

  return true;
};

export const createFamilyApi = async (formData: FormData) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/families`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response) {
    throw new Error("Some Error createFamilyApi");
  }

  const resJSON = await response.json();
  return resJSON;
};