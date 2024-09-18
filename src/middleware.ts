import { getAuthToken } from "auth/token";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const user = await getUserMeLoader();
  const user = {ok: true}
  const token = await getAuthToken()
  const currentPath = request.nextUrl.pathname;

  if (!currentPath.startsWith("/signin") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|images|_next/image|.*\\.png$|.*\\.svg$.*\\.jpg$).*)'],
};