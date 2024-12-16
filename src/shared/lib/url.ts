import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};


export const createQueryStringFromObject = (
  object: Record<string, any>,
  searchParams: ReadonlyURLSearchParams
) => {
  const currentSearchParams = new URLSearchParams(searchParams.toString());

  for (const key in object) {
    // @ts-ignore
    const value = object[key];
    currentSearchParams.set(key, value)
  }

  return currentSearchParams.toString();
};


export const createUrlFromOrigin = (route: string) => {
  if (typeof window === "undefined") {
    return ""
  }
  return `${window.document.location.origin}${route}`
};
