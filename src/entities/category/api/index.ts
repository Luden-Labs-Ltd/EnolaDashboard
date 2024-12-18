"use server";

import { fetchInstance } from "shared/api";
import { CategoryTypeApi } from "../model";
import { createCategoriesApiDto } from "./types";
import { REVALIDATE_GET_CATEGORY_TAG } from "./constant";
import { revalidateTag } from "next/cache";

export const getCategoriesApi = async (
  programId: string | null
): Promise<CategoryTypeApi[]> => {
  if (!programId) {
    return [];
  }

  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/categories`,
    {
      method: "GET",
      next: {
        tags: [REVALIDATE_GET_CATEGORY_TAG],
      },
    }
  );

  if (!response) {
    throw new Error("Something wrong getCategoriesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }

  return resJSON;
};

export const createCategoriesApi = async (
  dto: createCategoriesApiDto,
  programId: string
): Promise<CategoryTypeApi[]> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/categories`,
    {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createCategoriesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  revalidateTag(REVALIDATE_GET_CATEGORY_TAG);
  return resJSON;
};

export const deleteCategoryApi = async (
  programId: string,
  categoryId: number,
): Promise<Boolean | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/categories/${categoryId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteFamilyApi");
  }

  return true;
};
