"use server";
import { revalidateTag } from "next/cache";
import { createResourceApi, deleteResourceApi, editResourceApi } from "../api";
import { CreateResourceDto, EditResourceDto } from "../api/types";
import { GET_RESOURCES_REVALIDATE_TAG } from "../api/const";

export const createResource = async (
  programId: string,
  data: CreateResourceDto
) => {
  await createResourceApi(programId, data);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};

export const editResource = async (
  programId: string,
  resourceId: number,
  data: EditResourceDto
) => {
  await editResourceApi(programId, resourceId, data);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};

export const deleteResource = async (programId: string, resourceId: number) => {
  await deleteResourceApi(programId, resourceId);
  revalidateTag(GET_RESOURCES_REVALIDATE_TAG);
};
