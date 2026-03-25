"use server";
import { fetchInstance } from "shared/api";
import { NotesDto, NotesType } from "../model/types";
import { GET_NOTES_TAG } from "./const";

export const getNotesById = async (
  familyId: number | string
): Promise<NotesType[] | null> => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}/notes`,
    {
      method: "GET",
      next: {
        tags: [GET_NOTES_TAG],
      },
    }
  );

  if (!response) {
    return null;
  }

  const resJSON = await response.json();
  return resJSON;
};

export const createNotesApi = async (
  familyId: string | number,
  data: NotesDto
) => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}/notes`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createNotesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};


export const updateNotesApi = async (
  familyId: string | number,
  notesId: number | string,
  data: NotesDto
) => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}/notes/${notesId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error("Some Error createNotesApi");
  }

  const resJSON = await response.json();
  if (resJSON.error) {
    throw new Error(resJSON.error);
  }
  return resJSON;
};

export const deleteNotesApi = async (
  familyId: number | string,
  notesId: number | string,
) => {
  const response = await fetchInstance(
    `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/families/${familyId}/notes/${notesId}`,
    {
      method: "DELETE",
    }
  );
  if (!response) {
    throw new Error("Some Error deleteNotesApi");
  }

  // const data = await response?.json()
  // if (data?.error) {
  //   throw new Error(data?.error);
  // }
  return true;
}