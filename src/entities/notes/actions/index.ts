"use server";
import { handleServerError } from "shared/error/api";
import { NotesDto } from "../model/types";
import { createNotesApi, deleteNotesApi, updateNotesApi } from "../api/notes";
import { revalidateTag } from "next/cache";
import { GET_NOTES_TAG } from "../api/const";

export const createNotes = async (familyId: number | string, data: NotesDto) => {
  try {
    const note = await createNotesApi(familyId, data);
    revalidateTag(GET_NOTES_TAG);
    return note
  } catch (error) {
    return handleServerError(error);
  }
};

export const editNotes = async (familyId: number | string, noteId: string | number,data: NotesDto) => {
  try {
    await updateNotesApi(familyId, noteId, data);
    revalidateTag(GET_NOTES_TAG);
  } catch (error) {
    return handleServerError(error);
  }
};

export const deleteNotes = async (familyId: string | number, noteId: string | number) => {
  try {
    await deleteNotesApi(familyId, noteId);
    revalidateTag(GET_NOTES_TAG);
  } catch (error) {
    return handleServerError(error);
  }
};


