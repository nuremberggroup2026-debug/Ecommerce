"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";
import { columns } from "./columns";
import type { User } from "@/features/users/types";

interface UserDataTableProps {
  data: User[];
}

export function UserDataTable({ data }: UserDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      title="Users"
      description="Manage your users"
    />
  );
}
