"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';



import { Checkbox } from "@/components/ui/checkbox"
import {DataTableColumnHeader} from "@/app/(admin)/dashboard/products/data-table-column-header"
import { Button } from "@/components/ui/button";

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
       header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />)

    },
  
  {
    accessorKey: "amount",
    header: () => <div >Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className=" font-medium">{formatted}</div>
    },
  },
    {
    id: "edit",
    header:  () => <div className="text-center">Actions</div>,
cell: () => (
  <div className="flex items-center justify-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      className="text-black hover:bg-gray-100 hover:text-black"
    >
      <SquarePen className="h-4 w-4" strokeWidth={1.8} />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      className="text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
),
    enableSorting: false,
    enableHiding: false,
  },
    
]