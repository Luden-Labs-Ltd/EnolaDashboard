"use server";
import { Program } from "entities/auth/api/types";
import { setCookie } from "shared/utils/cookies";
import { fetchInstance } from "shared/api";
import { handleServerError } from "shared/error/api";

export async function changeProgram(program: Program) {
  const stringProgram = JSON.stringify(program);
  await setCookie("currentProgram", stringProgram);
}

export async function activateProgram(programId: string) {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs/${programId}`,
      {
        method: "PUT",
      }
    );

    if (!response) {
      throw new Error("something happen when program activate");
    }
    const resJSON = await response.json();
    if (resJSON.error) {
      throw new Error(resJSON.error);
    }
    return resJSON;
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createProgram(data: { name: string; language: string }) {
  try {
    const response = await fetchInstance(
      `${process.env.BASE_URL_BACKEND}/api/v2/dashboard/programs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response) {
      throw new Error("something happen when program create");
    }

    const resJSON = await response.json();

    if (resJSON.error) {
      throw new Error(resJSON.error);
    }

    return resJSON as Program;
  } catch (error) {
    return handleServerError(error);
  }
}
