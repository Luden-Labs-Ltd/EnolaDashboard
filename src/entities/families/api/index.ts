"use server";
import { GET_FAMILIES_REVALIDATE_TAG } from "./const";
import { EditFamilyDto, FamilyApi } from "./types";
import { fetchInstance } from "shared/api";

export const getFamiliesFromApi = async (): Promise<FamilyApi[]> => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + "/api/v2/dashboard/families",
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
  familyId: number | string
): Promise<FamilyApi | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}`,
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
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}`,
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
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/families`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response) {
    throw new Error("Some Error createFamilyApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error)
  }
  return resJSON;
};



export const editFamilyApi = async (familyId: number, data: EditFamilyDto) => {

  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/families/${familyId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response) {
    throw new Error("Some Error editFamilyApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error)
  }
  return resJSON;
};