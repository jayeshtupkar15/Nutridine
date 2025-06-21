import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extend the NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role (admin, user, etc.) */
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}
