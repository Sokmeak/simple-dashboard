import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggIn = !!auth?.user;
      const isOnDasboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDasboard) {
        if (isLoggIn) return true;
        return false;
      } else if (isLoggIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
