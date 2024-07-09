import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
 
export  default auth((req)=>{
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  const isHomeRoute = nextUrl.pathname === "/";
  const isSignInRoute = nextUrl.pathname === "/sign-in";

  if (isLoggedIn && isSignInRoute) {
    return Response.redirect(new URL('/', nextUrl));
  }
  if (!isLoggedIn && isHomeRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }

  return 

});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};