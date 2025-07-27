import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function setCookie(name: string, value: string, options?: Partial<typeof config>): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...config, ...options });
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, "", { ...config, maxAge: 0 });
}