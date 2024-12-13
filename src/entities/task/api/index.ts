"use server";

import { fetchInstance } from "shared/api";
import { TaskTypeApi } from "../model";
import { CreateTasksApiDto } from "./types";
import { REVALIDATE_GET_TASK_TAG } from "./constant";
import { revalidateTag } from "next/cache";

export const getTasks = async (
  programId: string | null
): Promise<TaskTypeApi[]> => {
  if (!programId) {
    return [];
  }
  // const tasks: TaskType[] = [
  //   {
  //     title: "Task 1",
  //     id: "a1b2c3d4e5",
  //     active: true,
  //     default: false,
  //   },
  //   {
  //     title: "Task 2",
  //     id: "f6g7h8i9j0",
  //     active: false,
  //     default: false,
  //   },
  //   {
  //     title: "Task 3",
  //     id: "k1l2m3n4o5",
  //     active: true,
  //     default: true,
  //   },
  //   {
  //     title: "Task 4",
  //     id: "p6q7r8s9t0",
  //     active: false,
  //     default: false,
  //   },
  //   {
  //     title: "Task 5",
  //     id: "u1v2w3x4y5",
  //     active: true,
  //     default: false,
  //   },
  // ];
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}/task_templates`,
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
  const promise = await Promise.all(
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
