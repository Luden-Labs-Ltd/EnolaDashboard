import { getCookie } from "shared/utils/cookies";

export async function getAuthToken() {
  const authToken = await getCookie("jwt");
  return authToken;
}
