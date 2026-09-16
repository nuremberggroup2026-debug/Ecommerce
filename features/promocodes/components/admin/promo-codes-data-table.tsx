"use client";

import { DataTableServer } from "@/app/(admin)/dashboard/components/data-table-server";
import { columns } from "./columns";
import { AllPromoCodes } from "../../types";
import {
  deleteManyPromoCodes,
  adminDeletePromoCode,
} from "@/features/promocodes/api/promocodes.client.api";
interface PromoCodesDataTableServerProps {
  data: AllPromoCodes[];
  pageCount: number;
  route: string;
}

export function PromoCodesDataTableServer({
  data,
  pageCount,
  route,
}: PromoCodesDataTableServerProps) {
  return (
    <DataTableServer
      columns={columns(route, {
        onDelete: adminDeletePromoCode,
      })}
      data={data}
      pageCount={pageCount}
      title="Promo Codes"
      description="Manage your Promo Codes"
      addHref="/dashboard/promo-codes/add"
      addLabel="Add Promo Code"
      onDeleteSelected={deleteManyPromoCodes}
    />
  );
}
