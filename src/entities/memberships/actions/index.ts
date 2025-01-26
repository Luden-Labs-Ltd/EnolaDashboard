"use server";
import { revalidateTag } from "next/cache";
import {
  createMembershipApi,
  deleteMembershipApi,
  editMembershipApi,
} from "../api";
import { GET_MEMBERSHIPS_REVALIDATE_TAG } from "../api/const";
import { AddMembershipDto, EditMembershipDto } from "../api/types";
import { handleServerError } from "shared/error/api";

export const createMembers = async (familyId: string, addFamilyDto: AddMembershipDto) => {
  try {
    await createMembershipApi(familyId, addFamilyDto);
  } catch (error) {
    return handleServerError(error)
  }
};

export const deleteMembership = async (
  familyId: string,
  membershipId: string
) => {
  try {
    await deleteMembershipApi(familyId, membershipId);
    revalidateTag(GET_MEMBERSHIPS_REVALIDATE_TAG);
  } catch (error) {
    return handleServerError(error)
  }
};

export const editMembership = async (
  familyId: number | string,
  membershipId: number | string,
  membershipDto: EditMembershipDto
) => {
  try {
    const res = await editMembershipApi(familyId, membershipId, membershipDto);
    revalidateTag(GET_MEMBERSHIPS_REVALIDATE_TAG);
    return res;
  } catch (error) {
    return handleServerError(error)
  }
};
