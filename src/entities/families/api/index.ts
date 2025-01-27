"use server";
import { getCurrentProgramId } from "entities/program";
import { GET_FAMILIES_REVALIDATE_TAG } from "./const";
import {
  CreateFamilyDto,
  EditFamilyDto,
  EditFamilyInfoDto,
  FamilyApi,
} from "./types";
import { fetchInstance } from "shared/api";
import { getCurrentProfileApi } from "entities/auth";

type SortObject = {
  name: string;
  order: "desc" | "asc";
};

type GetFamiliesDto = {
  familyName: string;
  familyId: string;
  isArchived: boolean;
  isMyFamilies: boolean;
  sort: SortObject | null;
  currentPage: number;
  perPage: number;
};
export const getFamiliesFromApi = async (
  props: GetFamiliesDto
): Promise<{
  familiesApiData: FamilyApi[];
  totalCount: number;
}> => {
  const {
    familyName,
    familyId,
    isArchived,
    isMyFamilies,
    sort,
    currentPage,
    perPage,
  } = props;
  const programId = await getCurrentProgramId();
  const profile = await getCurrentProfileApi();

  const params = JSON.stringify({
    name_cont: familyName,
    program_id_eq: programId,
    coordinator_id_eq: isMyFamilies ? profile?.id ?? "" : "",
    id_eq: familyId,
    archived_eq: isArchived,
    sorts: sort ? `${sort.name} ${sort.order}` : "created_at desc",
  });
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND +
      `/api/v2/dashboard/families?q=${params}&page=${currentPage}&per_page=${perPage}`,
    {
      method: "GET",
      next: {
        tags: [GET_FAMILIES_REVALIDATE_TAG],
      },
    }
  );

  if (!response) {
    return {
      familiesApiData: [],
      totalCount: 0,
    };
  }

  const resJSON = await response.json();
  const totalCount = response.headers.get("x-total")
    ? Number(response.headers.get("x-total"))
    : 0;

  return {
    familiesApiData: resJSON,
    totalCount: totalCount,
  };
};

export const getFamilyById = async (
  familyId: number | string
): Promise<FamilyApi | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}`,
    {
      method: "GET",
    }
  );

  if (!response) {
    return null;
  }

  const resJSON = await response.json();
  return resJSON;
};

export const deleteFamilyById = async (
  familyId: string | number
): Promise<Boolean | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteFamilyApi");
  }

  return true;
};

export const createFamilyApi = async (data: CreateFamilyDto) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/families`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createFamilyApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};

export const editFamilyApi = async (
  familyId: number,
  data: EditFamilyInfoDto
) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/families/${familyId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error editFamilyApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};
