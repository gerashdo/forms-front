import { useState } from "react";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagitation";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/helpers/dateFormat";
import { GetFormsResponseForm } from "@/interfaces/form";
import { ArrowUpDown } from "lucide-react";


interface FormDataTableProps {
  forms: GetFormsResponseForm[];
  totalPages: number;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  includeActions?: boolean;
  onViewDetails?: (formId: number) => void;
  onDelete?: (formId: number) => void;
}

export const FormDataTable = ({
  forms,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  includeActions,
  onViewDetails,
  onDelete,
}: FormDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<GetFormsResponseForm>[] = [
    {
      accessorKey: "submissionDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submission Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{formatDateTime(row.getValue("submissionDate"))}</div>,
    },
    {
      accessorKey: "Template.title",
      header: "Template",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "User.email",
      header: "User Email",
      cell: (info) => info.getValue(),
    },
  ];

  if (includeActions && onViewDetails && onDelete) {
    columns.push({
      id: "actions",
      cell: ({ row }) => {
        const form = row.original;
        const menuItems = [
          {id: "view", label: "View details", action: () => onViewDetails(form.id)},
          {id: "delete", label: "Delete form", action: () => onDelete(form.id)},
        ];
        return <DataTableDropdownMenu label="Actions" items={menuItems} triggerLabel="Open menu"/>;
      }
    })
  }

  const table = useReactTable({
    data: forms,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel<GetFormsResponseForm>(),
    getPaginationRowModel: getPaginationRowModel<GetFormsResponseForm>(),
    getSortedRowModel: getSortedRowModel<GetFormsResponseForm>(),
    state: {
      sorting,
    }
  })

  return (
    <>
      <DataTable noDataMessage="No forms submitted yet" table={table} columns={columns} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </>
  );
}
