import { type DefaultSession } from "next-auth";
import { type JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: "user" | "admin" | "super_admin";
    emailVerified?: Date | null;
  }

  interface Session {
   DefaultSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: "user" | "admin" | "super_admin";
    
  }
}
