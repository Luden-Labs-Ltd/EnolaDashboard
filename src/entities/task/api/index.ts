"use server";

import { fetchInstance } from "shared/api";
import { TaskTypeApi } from "../model";
import { CreateTasksApiDto } from "./types";
import { REVALIDATE_GET_TASK_TAG } from "./constant";
import { revalidateTag } from "next/cache";

type SearchParameters = {
  taskName: string,
}


export const getTasks = async (
  programId: string | null,
  searchParameters: SearchParameters
): Promise<TaskTypeApi[]> => {
  if (!programId) {
    return [];
  }
  
  const params = JSON.stringify({
    title_cont: searchParameters.taskName,
    sorts: "start_at asc",
  });

  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/task_templates?q=${params}`,
    {
      method: "GET",
      next: {
        tags: [REVALIDATE_GET_TASK_TAG],
      },
    }
  );

  if (!response) {
    return [];
  }
  const jsonResponse = await response?.json();
  return jsonResponse;
};

export const createTaskApi = async (
  dto: CreateTasksApiDto,
  programId: string
): Promise<TaskTypeApi> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/task_templates`,
    {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createCategoriesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  revalidateTag(REVALIDATE_GET_TASK_TAG);
  return resJSON;
};

export const deleteTaskApi = async (
  programId: string,
  selectedTasks: number[]
) => {
  await Promise.all(
    selectedTasks.map((taskId) => {
      return fetchInstance(
        `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/task_templates/${taskId}`,
        {
          method: "DELETE",
        }
      );
    })
  );

  revalidateTag(REVALIDATE_GET_TASK_TAG);
};
