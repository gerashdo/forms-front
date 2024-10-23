import { useState } from "react";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagitation";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/helpers/dateFormat";
import { GetFormsResponseForm } from "@/interfaces/form";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";


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
  const{t} = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<GetFormsResponseForm>[] = [
    {
      accessorKey: "submissionDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("components.formDataTable.date")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{formatDateTime(row.getValue("submissionDate"))}</div>,
    },
    {
      accessorKey: "Template.title",
      header: t("components.formDataTable.template"),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "User.email",
      header: t("components.formDataTable.email"),
      cell: (info) => info.getValue(),
    },
  ];

  if (includeActions && onViewDetails && onDelete) {
    columns.push({
      id: "actions",
      cell: ({ row }) => {
        const form = row.original;
        const menuItems = [
          {id: "view", label: t("components.formDataTable.view"), action: () => onViewDetails(form.id)},
          {id: "delete", label: t("components.formDataTable.delete"), action: () => onDelete(form.id)},
        ];
        return <DataTableDropdownMenu
          label={t("components.formDataTable.label")}
          items={menuItems}
          triggerLabel={t("components.formDataTable.triggerLabel")}
        />;
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
      <DataTable
        noDataMessage={t("components.formDataTable.noDataMessage")}
        table={table}
        columns={columns}
      />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </>
  );
}
