"use server";

import { revalidateTag } from "next/cache";
import { REVALIDATE_GET_CATEGORY_TAG } from "../api/constant";
import { deleteCategoryApi } from "../api";
import { handleServerError } from "shared/error/api";

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await deleteCategoryApi(categoryId);
    revalidateTag(REVALIDATE_GET_CATEGORY_TAG);
  } catch (error: any) {
    return handleServerError(error);
  }
};
