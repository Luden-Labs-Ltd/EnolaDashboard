"use server";

import { fetchInstance } from "shared/api";
import { MembershipApi } from "./types";
import { GET_MEMBERSHIPS_REVALIDATE_TAG } from "./const";

export const getMembershipsFromApi = async (
  familyId: string
): Promise<MembershipApi[]> => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/families/${familyId}/memberships`,
    {
      method: "GET",
      next: {
        tags: [GET_MEMBERSHIPS_REVALIDATE_TAG],
      },
    }
  );
  if (!response) {
    return [];
  }
  const resJSON = await response.json();
  return resJSON;
};

export const createMembershipApi = async (
  familyId: string,
  formData: FormData
) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/families/${familyId}/memberships`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response) {
    throw new Error("Some Error createMembershipApi");
  }

  const resJSON = await response.json();

  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};

export const deleteMembershipApi = async (
  familyId: string,
  membershipId: string
) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND +
      `/api/v2/families/${familyId}/memberships/${membershipId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteMembershipApi");
  }

  const resJSON = await response.json();

  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};
