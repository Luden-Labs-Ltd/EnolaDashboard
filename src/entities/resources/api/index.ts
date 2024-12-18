import { fetchInstance } from "shared/api";
import { CreateResourceDto, EditResourceDto, ResourcesTypeApi } from "./types";
import { GET_RESOURCES_REVALIDATE_TAG } from "./const";

type SearchParameters = {
  resourceName: string,
  categoryId: string,
}

export const getResourcesFromApi = async (
  programId: string | null,
  searchParameters: SearchParameters,
): Promise<ResourcesTypeApi[]> => {
  if (!programId) {
    return []
  }
  const params = JSON.stringify({
    name_cont: searchParameters.resourceName,
    category_id_eq: searchParameters.categoryId === "all" ? "" : searchParameters.categoryId,
    sorts: "created_at desc",
  });
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources?q=${params}`,
    {
      method: "GET",
      next: {
        tags: [GET_RESOURCES_REVALIDATE_TAG],
      },
    }
  );

  if (!response) {
    return [];
  }

  const resJSON = await response.json();
  return resJSON;
};

export const createResourceApi = async (programId: string, data: CreateResourceDto) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createResourceApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};

export const editResourceApi = async (programId: string, resourceId: number, data: EditResourceDto) => {
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources/${resourceId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error editResourceApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};


export const deleteResourceApi = async (
  programId: string,
  resourceId: number
) => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/resources/${resourceId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteResourceApi");
  }

  return true;
};
