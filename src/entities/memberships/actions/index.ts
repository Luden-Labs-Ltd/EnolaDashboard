"use server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import {
  createMembershipApi,
  deleteMembershipApi,
  editMembershipApi,
} from "../api";
import { GET_MEMBERSHIPS_REVALIDATE_TAG } from "../api/const";
import { AddMembershipDto, EditMembershipDto } from "../api/types";

export const createMembers = async (familyId: string, addFamilyDto: AddMembershipDto) => {
  await createMembershipApi(familyId, addFamilyDto);
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
