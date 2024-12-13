"use server";
import { z } from "zod";
import { createFamilyApi, deleteFamilyById, editFamilyApi } from "../api";
import { revalidateTag } from "next/cache";
import { GET_FAMILIES_REVALIDATE_TAG } from "../api/const";
import { CreateFamilyDto, EditFamilyDto } from "../api/types";


export const createFamily = async (data: CreateFamilyDto) => {
  await createFamilyApi(data);
  revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
};

const schemaDeleteFamily = z.object({
  familyId: z.string(),
});

export const deleteFamily = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = schemaDeleteFamily.safeParse({
      familyId: formData.get("family_id"),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        apiError: null,
        data: "uncompleted",
      };
    }

    await deleteFamilyById(validatedFields.data.familyId);
    revalidateTag(GET_FAMILIES_REVALIDATE_TAG);

    return {
      ...prevState,
      zodErrors: null,
      apiError: null,
      data: "completed",
    };
  } catch (error: any) {
    return {
      ...prevState,
      zodErrors: null,
      apiError: error.message,
      data: "uncompleted",
    };
  }
};

export const editFamily = async (
  familyId: number,
  familyDto: EditFamilyDto
) => {
  const res = await editFamilyApi(familyId, familyDto);
  revalidateTag(GET_FAMILIES_REVALIDATE_TAG);
  return res;
};
