import { useState } from "react";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagitation";
import { formatDateTime } from "@/helpers/dateFormat";
import { Template } from "@/interfaces/template"
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";


interface TemplateDataTableProps {
  templates: Template[];
  totalPages: number;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onViewDetails: (templateId: number) => void;
  onDelete: (templateId: number) => void;
}

export const TemplateDataTable = ({
  templates,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onViewDetails,
  onDelete,
}: TemplateDataTableProps) => {
  const {t} = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "title",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t('components.templateDataTable.title')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({row}) => row.getValue("title"),
    },
    {
      accessorKey: "Topic.name",
      header: t('components.templateDataTable.topic'),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "createdAt",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t('components.templateDataTable.date')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => formatDateTime(info.getValue() as string),
    },
    {
      accessorKey: "isPublic",
      header: t('components.templateDataTable.public'),
      cell: (info) => info.getValue() ? "Yes" : "No",
    },
    {
      accessorKey: "User.email",
      header: t('components.templateDataTable.userEmail'),
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      cell: ({row}) => {
        const template = row.original;
        const menuItems = [
          {id: "view", label: t("components.templateDataTable.view"), action: () => onViewDetails(template.id)},
          {id: "delete", label: t("components.templateDataTable.delete"), action: () => onDelete(template.id)},
        ];
        return <DataTableDropdownMenu
          label={t("components.templateDataTable.label")}
          items={menuItems}
          triggerLabel={t("components.templateDataTable.triggerLabel")}
        />;
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
        noDataMessage={t('components.templateDataTable.noDataMessage')}
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
