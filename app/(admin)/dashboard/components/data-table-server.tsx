"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "@/app/(admin)/dashboard/components/DataTableViewOptions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableServerProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;

  title?: string;
  description?: string;

  addHref?: string;
  addLabel?: string;

  onDeleteSelected?: (ids: string[]) => Promise<unknown>;
  deleteSuccessMessage?: string;
}

export function DataTableServer<TData extends { id: string }, TValue>({
  columns,
  data,
  pageCount,
  title = "Data",
  description = "Manage your data",
  addHref,
  addLabel = "Add",
  onDeleteSelected,
  deleteSuccessMessage = "Deleted successfully",
}: DataTableServerProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const pageIndex = Number(searchParams.get("page") ?? "1") - 1;
  const pageSize = Number(searchParams.get("take") ?? "5");

  const [{ pageIndex: pIndex, pageSize: pSize }, setPagination] =
    useState<PaginationState>({
      pageIndex,
      pageSize,
    });

  const pagination = {
    pageIndex: pIndex,
    pageSize: pSize,
  };

  useEffect(() => {
    // When URL search params change, update internal table state if needed
    setPagination({
      pageIndex: Number(searchParams.get("page") ?? "1") - 1,
      pageSize: Number(searchParams.get("take") ?? "5"),
    });
  }, [searchParams]);

  const handlePaginationChange = (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState),
  ) => {
    const newPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination)
        : updaterOrValue;
    setPagination(newPagination);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPagination.pageIndex + 1));
    params.set("take", String(newPagination.pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    manualPagination: true,
    onPaginationChange: handlePaginationChange,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },

    enableRowSelection: true,
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  const selectedCount = selectedIds.length;

  const handleDeleteSelected = async () => {
    if (!onDeleteSelected || selectedIds.length === 0) {
      return;
    }

    try {
      setIsDeleting(true);

      await onDeleteSelected(selectedIds);

      table.resetRowSelection();

      setDeleteDialogOpen(false);

      toast.success(deleteSuccessMessage);

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete selected items");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4 ">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Delete */}
          {onDeleteSelected && selectedCount > 0 && (
            <Button
              variant="destructive"
              className="h-9 rounded-lg px-4 shadow-sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedCount})
            </Button>
          )}

          {/* Column visibility */}
          <DataTableViewOptions table={table} />

          {/* Add */}
          {addHref && (
            <Button
              asChild
              className="h-9 rounded-lg bg-black px-5 text-white shadow-sm hover:bg-neutral-800"
            >
              <a href={addHref}>{addLabel}</a>
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 px-6 text-xs font-semibold uppercase text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="transition hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center text-muted-foreground"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <DataTablePagination table={table} />
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete selected items?</AlertDialogTitle>

            <AlertDialogDescription>
              You are about to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedCount}
              </span>{" "}
              selected {selectedCount === 1 ? "item" : "items"}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDeleteSelected();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
