"use server";
import { createCoordinatorApi, deleteCoordinatorById } from "../api";
import { revalidateTag } from "next/cache";
import { handleServerError } from "shared/error/api";
import { GET_COORDINATORS_REVALIDATE_TAG } from "../api/const";

export const createCoordinator = async (data: {
  phone_number: string;
  first_name: string;
  last_name: string;
  role: string;
}) => {
  try {
    await createCoordinatorApi(data);
    revalidateTag(GET_COORDINATORS_REVALIDATE_TAG);
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const deleteCoordinator = async (coordinatorId: string | number) => {
  try {
    await deleteCoordinatorById(coordinatorId);
    revalidateTag(GET_COORDINATORS_REVALIDATE_TAG);
  } catch (error: any) {
    return handleServerError(error);
  }
};
