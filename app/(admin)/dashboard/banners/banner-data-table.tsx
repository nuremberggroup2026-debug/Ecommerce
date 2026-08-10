"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteBanner,
  deleteManyBanners,
} from "@/features/banner/api/banners.client.api";

import type { AdminBanner } from "@/features/banner/types";

interface BannerDataTableProps {
  data: AdminBanner[];
}

export function BannerDataTable({
  data,
}: BannerDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteBanner,
      })}
      data={data}
      title="Banners"
      description="Manage your banners and promotional content"
      addHref="/dashboard/banners/add"
      addLabel="Add Banner"
      onDeleteSelected={deleteManyBanners}
      deleteSuccessMessage="Banners deleted successfully"
    />
  );
}