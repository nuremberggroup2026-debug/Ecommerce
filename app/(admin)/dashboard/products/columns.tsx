"use client"

import { ColumnDef } from "@tanstack/react-table"

// مكونات shadcn
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// =======================================================
// نوع البيانات الموجود في كل Row داخل الجدول
// =======================================================
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// =======================================================
// تعريف الأعمدة
// =======================================================
export const columns: ColumnDef<Payment>[] = [

  // =====================================================
  // FEATURE #1
  // Checkbox لتحديد الصفوف
  // =====================================================
  {
    id: "select",

    // Checkbox الموجود في Header
    // يحدد جميع الصفوف الموجودة في الصفحة الحالية
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),

    // Checkbox لكل صف
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },

  // =====================================================
  // FEATURE #2
  // Status Column
  // =====================================================
  {
    accessorKey: "status",

    // Header أصبح Button
    // عند الضغط عليه يعمل Sorting
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  // =====================================================
  // FEATURE #3
  // Email Column
  // =====================================================
  {
    accessorKey: "email",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  // =====================================================
  // FEATURE #4
  // Amount Column
  // =====================================================
  {
    accessorKey: "amount",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    // cell تسمح لنا بعرض البيانات بالشكل الذي نريده
    cell: ({ row }) => {

      // الحصول على قيمة amount
      const amount = row.getValue("amount") as number

      // تنسيق الرقم ليظهر كعملة
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return (
        <div className="font-medium">
          {formatted}
        </div>
      )
    },
  },

  // =====================================================
  // FEATURE #5
  // Actions Column
  // =====================================================
  {
    id: "actions",

    // لا نحتاج Header هنا
    enableHiding: false,

    cell: ({ row }) => {

      // بيانات الصف الحالي
      const payment = row.original

      return (
        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id)
              }
            >
              Copy Payment ID
            </DropdownMenuItem>

            <DropdownMenuItem>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem>
              Delete
            </DropdownMenuItem> 

          </DropdownMenuContent>

        </DropdownMenu>
      )
    },
  },
]
