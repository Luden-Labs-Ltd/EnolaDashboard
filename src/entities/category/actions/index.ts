"use server";

import { revalidateTag } from "next/cache";
import { REVALIDATE_GET_CATEGORY_TAG } from "../api/constant";
import { deleteCategoryApi } from "../api";

export const deleteCategory = async (programId: string, categoryId: number) => {
  const res = await deleteCategoryApi(programId, categoryId);
  revalidateTag(REVALIDATE_GET_CATEGORY_TAG);
  return res;
};
