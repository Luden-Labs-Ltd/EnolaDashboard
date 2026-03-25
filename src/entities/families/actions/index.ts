"use server";
import { createFamilyApi, deleteFamilyById, editFamilyApi } from "../api";
import { revalidateTag } from "next/cache";
import { GET_FAMILIES_REVALIDATE_TAG } from "../api/const";
import {
  CreateFamilyDto,
  EditFamilyInfoDto,
} from "../api/types";
import { getCurrentProgramId } from "entities/program";
import { handleServerError } from "shared/error/api";

export const createFamily = async (
  data: Omit<CreateFamilyDto, "program_id">
) => {
  try {
    const programId = await getCurrentProgramId();
    await createFamilyApi({
      ...data,
      program_id: programId,
    });
    revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
  } catch (error: any) {
    return handleServerError(error)
  }
};

export const deleteFamily = async (familyId: string | number) => {
  try {
    await deleteFamilyById(familyId);
    revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
  } catch (error: any) {
    return handleServerError(error)
  }
};

export const editFamily = async (
  familyId: number | string,
  familyDto: Omit<EditFamilyInfoDto, "program_id">
) => {
  try {
    const programId = await getCurrentProgramId();
    const res = await editFamilyApi(familyId, {
      ...familyDto,
      program_id: programId,
    });
    revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
  } catch (error: any) {
    return handleServerError(error)
  }
};
