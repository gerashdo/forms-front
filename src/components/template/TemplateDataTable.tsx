import { useState } from "react";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagitation";
import { formatDateTime } from "@/helpers/dateFormat";
import { Template } from "@/interfaces/template"
import { ArrowUpDown } from "lucide-react";


interface TemplateDataTableProps {
  templates: Template[];
  totalPages: number;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export const TemplateDataTable = ({
  templates,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: TemplateDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigation = useNavigate();

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "title",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({row}) => row.getValue("title"),
    },
    {
      accessorKey: "Topic.name",
      header: "Topic",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "createdAt",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of creation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => formatDateTime(info.getValue() as string),
    },
    {
      accessorKey: "isPublic",
      header: "Public",
      cell: (info) => info.getValue() ? "Yes" : "No",
    },
    {
      accessorKey: "User.email",
      header: "Creator",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      cell: ({row}) => {
        const template = row.original;
        const menuItems = [
          {id: "view", label: "View details", action: () => navigation({to: `/templates/${template.id}`})},
          {id: "delete", label: "Delete template", action: () => console.log(template.id)},
        ];
        return <DataTableDropdownMenu label="Actions" items={menuItems} triggerLabel="Open menu"/>;
      },
    }
  ]

  const table = useReactTable({
    data: templates,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel<Template>(),
    getPaginationRowModel: getPaginationRowModel<Template>(),
    getSortedRowModel: getSortedRowModel<Template>(),
    state: {
      sorting,
    }
  })
  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        noDataMessage="No templates created yet."
      />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </>
  )
}
