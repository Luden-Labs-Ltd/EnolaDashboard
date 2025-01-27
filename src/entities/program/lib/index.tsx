"use server";

import { Program } from "entities/auth/api/types";
import { cookies } from "next/headers";
import { DEFAULT_PROGRAM_NAME } from "..";
import { getCurrentProfileApi } from "entities/auth";

export async function getCurrentProgram(): Promise<Program | null> {
  const stringProgram = cookies().get("currentProgram")?.value;

  if (!stringProgram) {
    return null;
  }
  const currentProgram = JSON.parse(stringProgram) as Program;
  return currentProgram;
}

export async function getCurrentProgramId(): Promise<string> {
  let currentProgram = await getCurrentProgram();

  if (!currentProgram) {
    const profile = await getCurrentProfileApi()
    currentProgram = profile?.company?.programs[0] ?? null
  }
  const programId = currentProgram?.id ?? DEFAULT_PROGRAM_NAME
  return programId
}