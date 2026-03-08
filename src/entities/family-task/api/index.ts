"use server";

import { fetchInstance } from "shared/api";
import { FamilyTaskApi, FamilyEventApi, CategoryWithTaskTemplates } from "./types";
import type { BulkTaskItem } from "./types";
import { handleServerError } from "shared/error/api";
import { getCurrentProgramId } from "entities/program";
import { getTasks } from "entities/task";
import { getCategoriesApi } from "entities/category";

// TODO: replace with "/api/v2/dashboard/families"
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

export const getFamilyEvents = async (
  familyId: string
): Promise<FamilyEventApi[]> => {
  const url = `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/events`;

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

export const markFamilyEventDone = async (
  familyId: string,
  eventId: string
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/events/${eventId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "completed" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to mark event as done");
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
  category_slug?: string;
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

export type UpdateFamilyTaskDto = {
  title?: string;
  description?: string;
  circle?: "public" | "private" | "intimate";
  category?: string;
  category_slug?: string;
  type?: "no_time" | "exact_time" | "until_time";
  repeated?: boolean;
  schedule?: string | null;
  start_at?: string | null;
  end_at?: string | null;
};

export const updateFamilyTask = async (
  familyId: string,
  taskId: string,
  dto: UpdateFamilyTaskDto
) => {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks/${taskId}`,
      {
        method: "PUT",
        body: JSON.stringify(dto),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response || !response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json();
  } catch (error) {
    return handleServerError(error);
  }
};

export const getFamilyTaskTemplates = async (
  _familyId: string
): Promise<CategoryWithTaskTemplates[]> => {
  const tryProgramTemplates = async (): Promise<CategoryWithTaskTemplates[]> => {
    const programId = await getCurrentProgramId();
    const [categoriesApi, tasksApi] = await Promise.all([
      getCategoriesApi(),
      getTasks({ taskName: "" }),
    ]);
    if (!categoriesApi?.length || !tasksApi?.length) return [];
    const byCategoryId = new Map<string, { title: string; tasks: string[] }>();
    for (const cat of categoriesApi) {
      const id = String(cat.id);
      byCategoryId.set(id, { title: cat.name, tasks: [] });
    }
    for (const task of tasksApi) {
      const id = String(task.category_id);
      const cat = byCategoryId.get(id);
      if (cat) cat.tasks.push(task.title);
    }
    return Array.from(byCategoryId.entries())
      .filter(([, v]) => v.tasks.length > 0)
      .map(([id, v]) => ({ id, title: v.title, tasks: v.tasks }));
  };

  const programResult = await tryProgramTemplates();
  if (programResult.length > 0) {
    return programResult;
  }

  const baseUrl = (process.env.BASE_URL_BACKEND ?? "").replace(/\/$/, "");
  const tryFetch = async (url: string): Promise<CategoryWithTaskTemplates[]> => {
    const response = await fetchInstance(url, { method: "GET" });
    if (!response || !response.ok) return [];
    const contentType = response.headers?.get?.("content-type") ?? "";
    if (!contentType.includes("application/json")) return [];
    try {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const appUrl = `${baseUrl}/families/${_familyId}/task_templates`;
  let result = await tryFetch(appUrl);
  if (result.length === 0 && baseUrl) {
    result = await tryFetch(`${baseUrl}${FAMILIES_BASE}/${_familyId}/task_templates`);
  }

  return result;
};

export const createFamilyTasksBulk = async (
  familyId: string,
  tasks: BulkTaskItem[]
) => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}${FAMILIES_BASE}/${familyId}/tasks/bulk`,
    {
      method: "POST",
      body: JSON.stringify({
        tasks: tasks.map((t) => ({
          ...t,
          category: t.category_name,
        })),
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response || !response.ok) {
    throw new Error("Failed to create tasks in bulk");
  }
  return response.json();
};
