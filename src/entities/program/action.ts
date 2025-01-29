"use server";
import { Program } from "entities/auth/api/types";
import { cookies } from "next/headers";
import { fetchInstance } from "shared/api";
import { handleServerError } from "shared/error/api";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function changeProgram(program: Program) {
  const stringProgram = JSON.stringify(program);
  await cookies().set("currentProgram", stringProgram, config);
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
