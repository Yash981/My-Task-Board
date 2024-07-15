// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// const { auth } = NextAuth(authConfig);
 
// export  default auth((req)=>{
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth
//   const isHomeRoute = nextUrl.pathname === "/";
//   const isSignInRoute = nextUrl.pathname === "/sign-in";
//   // const checks = ['/api','/board']
//   // const isApiRoute = checks.some((check) => nextUrl.pathname.startsWith(check));
//   console.log(isLoggedIn, isHomeRoute, isSignInRoute, nextUrl.pathname, nextUrl, "middleware");
//   if ((isLoggedIn && isHomeRoute) || (isLoggedIn && isSignInRoute)) {
//     return Response.redirect(new URL('/', nextUrl));
//   }
//   else if ((!isLoggedIn && isHomeRoute) || (!isLoggedIn && isSignInRoute)) {
//     return Response.redirect(new URL('/sign-in', nextUrl));
//   }

//   // return Response;
//  return 

// });
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)