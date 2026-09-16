"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Shield,
  User as UserIcon,
} from "lucide-react";

import type { User, UserRole } from "@/features/users/types";
import { adminUpdateUserRole } from "@/features/users/api/users.client.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ViewUserProps {
  user: User;
}

const USER_ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  admin: "Admin",
  super_admin: "Super Admin",
};

const USER_ROLE_STYLES: Record<UserRole, string> = {
  user: "border-blue-200 bg-blue-50 text-blue-700",
  admin: "border-red-200 bg-red-50 text-red-700",
  super_admin: "border-purple-200 bg-purple-50 text-purple-700",
};

const USER_ROLES: UserRole[] = ["user", "admin", "super_admin"];

export default function ViewUser({ user }: ViewUserProps) {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>(user.role);
  const [isUpdating, setIsUpdating] = useState(false);

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const initials =
    user.name
      ?.split(" ")
      .map((name) => name.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const handleRoleChange = async (value: UserRole) => {
    try {
      setIsUpdating(true);

      await adminUpdateUserRole(user.id, value);

      setRole(value);
      router.refresh();
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 pb-8 sm:space-y-6 sm:pb-10">
      {/* Header */}
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          className="mt-0.5 shrink-0 sm:mt-0"
          onClick={() => router.push("/dashboard/users")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            User Details
          </h1>

          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* User Header */}
      <Card className="overflow-hidden shadow-sm p-0">
        <div className="h-24 bg-linear-to-r from-gray-500 via-gray-500 to-gray-400 sm:h-32" />

        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-4">
              {/* Avatar */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md sm:h-28 sm:w-28">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-muted-foreground sm:text-2xl">
                    {initials}
                  </div>
                )}
              </div>

              {/* User info */}
              <div className="min-w-0 pb-0.5 sm:pb-1">
                <h2 className="truncate text-lg font-bold sm:text-xl">
                  {user.name || "Unnamed User"}
                </h2>

                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <Badge
              variant="outline"
              className={`w-fit ${USER_ROLE_STYLES[role]}`}
            >
              {USER_ROLE_LABELS[role]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Name</p>

                <p className="truncate font-medium">
                  {user.name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>

                <p className="truncate font-medium">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 px-4 sm:px-6">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-xs text-muted-foreground">Role</p>

                <Select
                  value={role}
                  onValueChange={(value) => handleRoleChange(value as UserRole)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    {USER_ROLES.map((value) => (
                      <SelectItem key={value} value={value}>
                        {USER_ROLE_LABELS[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Member Since</p>

                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => router.push("/dashboard/users")}
        >
          Back to Users
        </Button>
      </div>
    </div>
  );
}
