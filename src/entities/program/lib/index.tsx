"use server";

import { Program } from "entities/auth/api/types";
import { getCookie } from "shared/utils/cookies";
import { DEFAULT_PROGRAM_NAME } from "..";
import { getCurrentProfileApi } from "entities/auth";

export async function getCurrentProgram(): Promise<Program | null> {
  const stringProgram = await getCookie("currentProgram");

  if (!stringProgram) {
    return null;
  }
  const currentProgram = JSON.parse(stringProgram) as Program;
  return currentProgram;
}

export async function getCurrentProgramId(): Promise<string> {
  let currentProgram = await getCurrentProgram();

  if (!currentProgram) {
    console.log("[getCurrentProgramId] no current program found, getting profile");
    const profile = await getCurrentProfileApi()
    currentProgram = profile?.company?.programs[0] ?? null
  }
  const programId = currentProgram?.id ?? DEFAULT_PROGRAM_NAME
  return programId
}