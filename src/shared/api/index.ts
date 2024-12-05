"use server";
import { getAuthToken } from "entities/auth/token";

export const fetchInstance = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<Response | null> => {
  try {
    const token = await getAuthToken() ?? 'token not found';
    const {headers, ...rest} = init ?? {}
    const response = await fetch(input, {
      headers: {
        Authorization: token,
        ...headers,
      },
      ...rest,
    });

    return response
  } catch (error) {
    console.error(error);
    return null;
  }
};
