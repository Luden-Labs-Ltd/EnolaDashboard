"use server";
import { z } from "zod";
import { createFamilyApi, deleteFamilyById, editFamilyApi } from "../api";
import { revalidateTag } from "next/cache";
import { GET_FAMILIES_REVALIDATE_TAG } from "../api/const";
import { EditFamilyDto } from "../api/types";

const schemaCreateFamily = z.object({
  phoneNumber: z.string().min(6).max(20),
  title: z.string().min(1),
});

export const createFamily = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = schemaCreateFamily.safeParse({
      phoneNumber: formData.get("phone_number"),
      title: formData.get("title"),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        apiError: null,
        data: "uncompleted",
      };
    }

    await createFamilyApi(formData);
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

export const editFamily = async (familyId: number, familyDto: EditFamilyDto) => {
  const res = await editFamilyApi(familyId, familyDto);
  return res
};
