"use server";
import { revalidateTag } from "next/cache";
import { createResourceApi, deleteResourceApi, editResourceApi } from "../api";
import { CreateResourceDto, EditResourceDto } from "../api/types";
import { GET_RESOURCES_REVALIDATE_TAG } from "../api/const";
import { getCurrentProgramId } from "entities/program";

export const createResource = async (
  data: CreateResourceDto
) => {
  const programId = await getCurrentProgramId()
  await createResourceApi(programId, data);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};

export const editResource = async (
  resourceId: number,
  data: EditResourceDto
) => {
  const programId = await getCurrentProgramId()
  await editResourceApi(programId, resourceId, data);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};

export const deleteResource = async (resourceId: number) => {
  await deleteResourceApi(resourceId);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};
