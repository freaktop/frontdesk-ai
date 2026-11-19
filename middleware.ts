import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const p = req.nextUrl.pathname;
  const isDash = p.startsWith("/dashboard") || p.startsWith("/knowledge") || p.startsWith("/conversations") || p.startsWith("/settings");
  if (isDash && !isAuth) return Response.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: ["/dashboard/:path*", "/knowledge/:path*", "/conversations/:path*", "/settings/:path*"],
};
