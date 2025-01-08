"use server";
import { Program } from "entities/auth/api/types";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};


export async function changeProgram(program: Program) {
  const stringProgram = JSON.stringify(program)
  await cookies().set("currentProgram", stringProgram, config);
}
