import { getAuthToken } from "auth/token";

export async function getDashboardInfo() {
  const token = await getAuthToken();
  const response = await fetch(
    process.env.BASE_URL_BACKEND + "/api/v2/families",
    {
      // @ts-ignore
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
}
