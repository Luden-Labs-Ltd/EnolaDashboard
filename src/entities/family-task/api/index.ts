"use server";

import { fetchInstance } from "shared/api";
import { FamilyTaskApi } from "./types";
import { handleServerError } from "shared/error/api";

// TODO: заменить на "/api/v2/dashboard/families"
const FAMILIES_BASE = "/api/v2/dashboard/families";

export const getFamilyTasks = async (
  familyId: string
): Promise<FamilyTaskApi[]> => {
  const url = `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks`;

  const response = await fetchInstance(url, { method: "GET" });

  if (!response || !response.ok) {
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const markFamilyTaskDone = async (
  familyId: string,
  taskId: string
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks/${taskId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "completed" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to mark task as done");
    }

    return await response.json();
  } catch (error) {
    return handleServerError(error);
  }
};

export const restoreFamilyTask = async (
  familyId: string,
  taskId: string,
  hasAssignee: boolean
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks/${taskId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: hasAssignee ? "in_progress" : "initial",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to restore task");
    }

    return await response.json();
  } catch (error) {
    return handleServerError(error);
  }
};

export type CreateFamilyTaskDto = {
  title: string;
  description?: string;
  circle?: "public" | "private" | "intimate";
  category?: string;
  type?: "no_time" | "exact_time" | "until_time";
  schedule?: string;
};

export const createFamilyTask = async (
  familyId: string,
  dto: CreateFamilyTaskDto
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks`,
      {
        method: "POST",
        body: JSON.stringify({
          ...dto,
          schedule: dto.schedule || "* * * * *",
          type: dto.type || "no_time",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to create task");
    }

    return await response.json();
  } catch (error) {
    return handleServerError(error);
  }
};

export const deleteFamilyTask = async (
  familyId: string,
  taskId: string
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks/${taskId}`,
      { method: "DELETE" }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to delete task");
    }

    return true;
  } catch (error) {
    return handleServerError(error);
  }
};
