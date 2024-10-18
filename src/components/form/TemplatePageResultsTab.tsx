import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialQueryParamsToGetForms } from "@/constants/form/form";
import { getFormsQuery } from "@/queries/form";
import { GetFormsResponseForm } from "@/interfaces/form";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagitation";


interface TemplatePageResultsTabProps {
  templateId: string
}

export const TemplatePageResultsTab = ({templateId}: TemplatePageResultsTabProps) => {
  const [page, setPage] = useState<number>(initialQueryParamsToGetForms.page);
  const [sorting, setSorting] = useState<SortingState>([]);
  const formsQuery = useSuspenseQuery(getFormsQuery({
    ...initialQueryParamsToGetForms,
    page: page,
    templateId: Number(templateId),
  }))
  const forms = formsQuery.data.data
  const totalPages = Math.ceil(formsQuery.data.meta.total / initialQueryParamsToGetForms.limit);

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
      cell: ({ row }) => <div>{row.getValue("submissionDate")}</div>,
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
    {
      id: "actions",
      cell: ({ row }) => {
        const form = row.original;
        const menuItems = [
          {id: "view", label: "View details", action: () => console.log(form.id)},
          {id: "edit", label: "Edit form", action: () => console.log(form.id)},
          {id: "delete", label: "Delete form", action: () => console.log(form.id)},
        ];
        return <DataTableDropdownMenu label="Actions" items={menuItems} triggerLabel="Open menu"/>;
      },
    },
  ];

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
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          Filled out forms for this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable noDataMessage="No forms submitted yet" table={table} columns={columns} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={() => setPage((prev) => prev + 1)}
          onPreviousPage={() => setPage((prev) => prev - 1)}
        />
      </CardContent>
    </Card>
  );
}
