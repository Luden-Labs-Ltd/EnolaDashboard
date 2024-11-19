"use server";
import { z } from "zod";
import { createFamilyApi } from "../api";
import { revalidateTag } from "next/cache";
import { GET_FAMILIES_REVALIDATE_TAG } from "../api/const";

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
