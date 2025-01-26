"use server";

import { fetchInstance } from "shared/api";
import { CategoryTypeApi } from "../model";
import { createCategoriesApiDto } from "./types";
import { REVALIDATE_GET_CATEGORY_TAG } from "./constant";
import { revalidateTag } from "next/cache";
import { getCurrentProgramId } from "entities/program";
import { handleServerError, ServerActionResponse } from "shared/error/api";

export const getCategoriesApi = async (): Promise<CategoryTypeApi[]> => {
  const programId = await getCurrentProgramId();
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
  dto: createCategoriesApiDto
): Promise<ServerActionResponse<CategoryTypeApi[]>> => {
  try {
    const programId = await getCurrentProgramId();
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
  } catch (error) {
    return handleServerError(error)
  }
};

export const deleteCategoryApi = async (
  categoryId: string
): Promise<Boolean | null> => {
  const programId = await getCurrentProgramId();
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
