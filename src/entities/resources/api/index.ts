import { fetchInstance } from "shared/api";
import { CreateResourceDto, EditResourceDto, ResourcesTypeApi } from "./types";
import { GET_RESOURCES_REVALIDATE_TAG } from "./const";
import { getCurrentProgramId } from "entities/program";

type SearchParameters = {
  resourceName: string,
  categoryId: string,
}

export const getResourcesFromApi = async (
  searchParameters: SearchParameters,
): Promise<ResourcesTypeApi[]> => {
  const programId = await getCurrentProgramId()
  const params = JSON.stringify({
    name_cont: searchParameters.resourceName,
    category_id_eq: searchParameters.categoryId === "all" ? "" : searchParameters.categoryId,
    sorts: "created_at desc",
  });
  const encodedParams = encodeURIComponent(params);
  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources?q=${encodedParams}`,
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
  const payload: CreateResourceDto = {
    ...data,
    phone_number: data.phone_number?.trim(),
  };
  if (!payload.phone_number) {
    delete payload.phone_number;
  }

  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources`,
    {
      method: "POST",
      body: JSON.stringify(payload),
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
  const payload: EditResourceDto = {
    ...data,
    phone_number: data.phone_number?.trim(),
  };
  if (!payload.phone_number) {
    delete payload.phone_number;
  }

  const response = await fetchInstance(
    process.env.BASE_URL_BACKEND + `/api/v2/dashboard/programs/${programId}/resources/${resourceId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
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
  resourceId: number
) => {
  const programId = await getCurrentProgramId()
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/resources/${resourceId}`,
    {
      method: "DELETE",
    }
  );

  if (!response) {
    throw new Error("Some Error deleteResourceApi");
  }


  const resJSON = response.body ? await response.json() : {};
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};


export const importResourcesApi = async (
  formData: FormData,
  ai: boolean = false
) => {
  const programId = await getCurrentProgramId()
  
  // Добавляем параметр ai в FormData
  formData.set("ai", ai.toString());
  
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/resources/import`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!response) {
    throw new Error("Some Error importResourcesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};
