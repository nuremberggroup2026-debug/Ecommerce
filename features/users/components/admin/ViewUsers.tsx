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
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/users")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Details</h1>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <div className="h-32 bg-linear-to-r from-primary/10 via-primary/5 to-muted" />

        <CardContent className="relative px-6 pb-6">
          <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                    {initials}
                  </div>
                )}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold">
                  {user.name || "Unnamed User"}
                </h2>

                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Badge variant="outline" className={USER_ROLE_STYLES[role]}>
              {USER_ROLE_LABELS[role]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Name</p>

                <p className="font-medium">{user.name || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>

                <p className="truncate font-medium">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex-1 space-y-2">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>

                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/users")}
        >
          Back to Users
        </Button>
      </div>
    </div>
  );
}
