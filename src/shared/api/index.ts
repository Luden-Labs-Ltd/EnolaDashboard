"use server";
import { getAuthToken } from "entities/auth/token";

export const fetchInstance = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<Response | null> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(input, {
      // @ts-ignore
      headers: {
        Authorization: token,
      },
      ...init,
    });

    return response
  } catch (error) {
    console.error(error);
    return null;
  }
};
