"use server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import {
  createMembershipApi,
  deleteMembershipApi,
  editMembershipApi,
} from "../api";
import { GET_MEMBERSHIPS_REVALIDATE_TAG } from "../api/const";
import { EditMembershipDto } from "../api/types";

const CircleTypeSchema = z.union([
  z.literal("intimate"),
  z.literal("public"),
  z.literal("private"),
]);

const schemaCreateFamily = z.object({
  phone_number: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  age: z.string(),
  gender: z.string(),
  circle: CircleTypeSchema,
  primary: z.any(),
});

export const createMembers = async (prevState: any, formData: FormData) => {
  try {
    const familyId = prevState.familyId;
    const validatedFields = schemaCreateFamily.safeParse({
      phone_number: formData.get("phone_number"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      circle: formData.get("circle"),
      primary: formData.get("primary"),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        apiError: null,
        data: "uncompleted",
      };
    }
    const isPrimaryCheckboxTrue = validatedFields.data.primary === "on";

    formData.set("primary", String(isPrimaryCheckboxTrue));

    await createMembershipApi(familyId, formData);
    revalidateTag(GET_MEMBERSHIPS_REVALIDATE_TAG);

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

export const deleteMembership = async (
  familyId: string,
  membershipId: string
) => {
  await deleteMembershipApi(familyId, membershipId);
  revalidateTag(GET_MEMBERSHIPS_REVALIDATE_TAG);
};

export const editMembership = async (
  familyId: number | string,
  membershipId: number | string,
  membershipDto: EditMembershipDto
) => {
  const res = await editMembershipApi(familyId, membershipId, membershipDto);
  return res;
};
