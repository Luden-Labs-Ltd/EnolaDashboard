"use server";
import { createFamilyApi, deleteFamilyById, editFamilyApi } from "../api";
import { revalidateTag } from "next/cache";
import { GET_FAMILIES_REVALIDATE_TAG } from "../api/const";
import { CreateFamilyDto, EditFamilyDto } from "../api/types";
import { getCurrentProgramId } from "entities/program";

export const createFamily = async (
  data: Omit<CreateFamilyDto, "program_id">
) => {
  const programId = await getCurrentProgramId();
  await createFamilyApi({
    ...data,
    program_id: programId,
  });
  revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
};

export const deleteFamily = async (familyId: string | number) => {
  await deleteFamilyById(familyId);
  revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
};

export const editFamily = async (
  familyId: number,
  familyDto: EditFamilyDto
) => {
  const res = await editFamilyApi(familyId, familyDto);
  revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
  return res;
};
