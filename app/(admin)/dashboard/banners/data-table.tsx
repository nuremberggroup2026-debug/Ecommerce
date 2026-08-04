"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
    ColumnFiltersState,
      getFilteredRowModel,
        VisibilityState,



} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./pagination"

import { Input } from "@/components/ui/input"
import {DataTableViewOptions}from "@/app/(admin)/dashboard/products/DataTableViewOptions"
import type { AdminBanner } from "@/features/banner/types"




import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
type SortingState = {
  id: string;
  desc: boolean;
}[];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])

    const [columnVisibility, setColumnVisibility] =
   useState<VisibilityState>({})
     const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
         onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,


    state: {
      sorting,
                  columnVisibility,
                        rowSelection,


    },
     
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 5, 
    },
  },
  })
  

  return (
    <>
          <div className="flex items-center py-4">
            
 
       <DataTableViewOptions table={table}/>
      </div>
    <div className="overflow-hidden  w-[800px] rounded-md border">
      <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </div>
  <DataTablePagination table={table}/>

    </>
  )
}