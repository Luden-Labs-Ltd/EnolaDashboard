"use server";
import { GET_COORDINATORS_REVALIDATE_TAG } from "./const";
import { CoordinatorApi } from "./types";
import { fetchInstance } from "shared/api";
import { RoleType } from "shared/types/role";

type SortObject = {
  name: string;
  order: "desc" | "asc";
};

type GetCoordinatorsDto = {
  by_phone_number: string;
  full_name_cont: string;
  role_eq?: RoleType;
  sort: SortObject | null;
  currentPage: number;
  perPage: number;
};
export const getCoordinatorsFromApi = async (
  props: GetCoordinatorsDto
): Promise<{
  coordinatorsApiData: CoordinatorApi[];
  totalCount: number;
}> => {
  const {
    by_phone_number,
    full_name_cont,
    sort,
    currentPage,
    perPage,
  } = props;

  const params = JSON.stringify({
    by_phone_number,
    full_name_cont,
    sorts: sort ? `${sort.name} ${sort.order}` : "created_at desc",
  });

  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND +
      `/api/v2/dashboard/users?q=${params}&page=${currentPage}&per_page=${perPage}`,
    {
      method: "GET",
      next: {
        tags: [GET_COORDINATORS_REVALIDATE_TAG],
      },
    }
  );

  if (!response) {
    return {
      coordinatorsApiData: [],
      totalCount: 0,
    };
  }

  const resJSON = await response.json();
  const totalCount = response.headers.get("x-total")
    ? Number(response.headers.get("x-total"))
    : 0;

    return {
    coordinatorsApiData: resJSON,
    totalCount: totalCount,
  };
};

export const getCoordinatorById = async (
  coordinatorId: number | string
): Promise<CoordinatorApi | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/users/${coordinatorId}`,
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

export const createCoordinatorApi = async (data: {
  phone_number: string;
  first_name: string;
  last_name: string;
  role: string;
  program_id?: string;
}) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + "/api/v2/dashboard/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        program_ids: data.program_id ? [data.program_id] : [],
      }),
    }
  );

  if (!response || !response.ok) {
    const responseErrorJson = await response?.json();
    if (responseErrorJson.error) {
      throw new Error(responseErrorJson.error);
    }
    throw new Error("Failed to create coordinator");
  }
  return response.json();
};

export const deleteCoordinatorById = async (
  coordinatorId: string | number
): Promise<boolean | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/users/${coordinatorId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteCoordinatorApi");
  }

  return true;
};
