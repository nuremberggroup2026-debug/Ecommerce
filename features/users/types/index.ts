import { user_role } from "@/generated/prisma/client";

export type UserRole = (typeof user_role)[keyof typeof user_role];

export type User = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  name: string;
  image: string | null;
};
