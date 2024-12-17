"use server";
import { revalidateTag } from "next/cache";
import { createResourceApi } from "../api";
import { CreateResourceDto } from "../api/types";
import { GET_RESOURCES_REVALIDATE_TAG } from "../api/const";

export const createResource = async (
  programId: string,
  data: CreateResourceDto
) => {
  await createResourceApi(programId, data);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};
