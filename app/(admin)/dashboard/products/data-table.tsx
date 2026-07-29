"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,

  // ==============================
  // Row Model الأساسي
  // ==============================
  getCoreRowModel,

  // ==============================
  // Features
  // ==============================
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,

  // ==============================
  // States الخاصة بكل Feature
  // ==============================
  SortingState,
  ColumnFiltersState,
  VisibilityState,

  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ======================================================
// Props
// ======================================================

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// ======================================================
// Component
// ======================================================

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  // ====================================================
  // FEATURE #1
  // Sorting State
  // ====================================================

  const [sorting, setSorting] = React.useState<SortingState>([])

  // ====================================================
  // FEATURE #2
  // Search / Filter State
  // ====================================================

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  // ====================================================
  // FEATURE #3
  // إظهار وإخفاء الأعمدة
  // ====================================================

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  // ====================================================
  // FEATURE #4
  // الصفوف المحددة
  // ====================================================

  const [rowSelection, setRowSelection] =
    React.useState({})

  // ====================================================
  // إنشاء الجدول
  // ====================================================

  const table = useReactTable({

    data,

    columns,

    // ==============================
    // states
    // ==============================

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    // ==============================
    // تحديث الحالات
    // ==============================

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,

    // ==============================
    // Features
    // ==============================

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>

      {/* ============================================
          FEATURE #5
          Search
      ============================================ */}

      <div className="flex items-center py-4">

        <Input

          placeholder="Search email..."

          value={
            (table
              .getColumn("email")
              ?.getFilterValue() as string) ?? ""
          }

          onChange={(event) =>
            table
              .getColumn("email")
              ?.setFilterValue(event.target.value)
          }

          className="max-w-sm"
        />

        {/* ============================================
            FEATURE #6
            Hide / Show Columns
        ============================================ */}
        

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="outline"
              className="ml-auto"
            >
              Columns
            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            {table
              .getAllColumns()

              .filter((column) => column.getCanHide())

              .map((column) => (
                <DropdownMenuCheckboxItem

                  key={column.id}

                  className="capitalize"

                  checked={column.getIsVisible()}

                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }

                >
                  {column.id}

                </DropdownMenuCheckboxItem>
              ))}

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

      {/* ============================================
          Table
      ============================================ */}

      <div className="rounded-md border">

        <Table>

          {/* ========================================
              Header
          ======================================== */}

          <TableHeader>

            {table.getHeaderGroups().map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead key={header.id}>

                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                  </TableHead>

                ))}

              </TableRow>

            ))}

          </TableHeader>

          {/* ========================================
              Body
          ======================================== */}

          <TableBody>

            {table.getRowModel().rows.length ? (

              table.getRowModel().rows.map((row) => (

                <TableRow

                  key={row.id}

                  data-state={
                    row.getIsSelected() && "selected"
                  }

                >

                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                    </TableCell>

                  ))}

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell

                  colSpan={columns.length}

                  className="text-center h-24"

                >

                  No Results

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      {/* ============================================
          FEATURE #7
          Pagination
      ============================================ */}

      <div className="flex items-center justify-end space-x-2 py-4">

        {/* عدد الصفوف المحددة */}

        <div className="flex-1 text-sm text-muted-foreground">

          {table.getFilteredSelectedRowModel().rows.length}

          {" "}of{" "}

          {table.getFilteredRowModel().rows.length}

          row(s) selected.

        </div>

        {/* Previous */}

        <Button

          variant="outline"

          size="sm"

          onClick={() => table.previousPage()}

          disabled={!table.getCanPreviousPage()}

        >

          Previous

        </Button>

        {/* Next */}

        <Button

          variant="outline"

          size="sm"

          onClick={() => table.nextPage()}

          disabled={!table.getCanNextPage()}

        >

          Next

        </Button>

      </div>

    </div>
  )
}
