import { useState } from "react";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { DataTable, DataTableDropdownMenu } from "@/components/ui/DataTable"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pagination } from "@/components/ui/Pagitation";
import { User, UserRoles } from "@/interfaces/auth";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";


interface UsersDataTableProps {
  users: User[];
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  includeMakeAdmin?: boolean;
  includeActions?: boolean;
  includeBlock?: boolean;
  onViewDetails?: (userId: number) => void;
  onDelete?: (userId: number) => void;
  onToggleBlock?: (userId: number, newValue: boolean) => void;
  onToggleAdmin?: (userId: number, newRole: UserRoles) => void;
}

export const UsersDataTable = ({
  users,
  page,
  totalPages,
  onNextPage,
  onPreviousPage,
  includeMakeAdmin,
  includeActions,
  includeBlock,
  onViewDetails,
  onDelete,
  onToggleBlock,
  onToggleAdmin,
}: UsersDataTableProps) => {
  const {t} = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: t('components.usersDataTable.name'),
      cell: ({row}) => {
        const user = row.original;
        return (
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {user.lastName.charAt(0)}{user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              {user.lastName} {user.name}
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: "email",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t('components.usersDataTable.email')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({row}) => row.getValue("email")
    },
    {
      accessorKey: "role",
      header: ({column}) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t('components.usersDataTable.role')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({row}) => row.getValue("role") === UserRoles.ADMIN ?
        t('components.usersDataTable.admin') :
        t('components.usersDataTable.user')
    },
  ]

  if (includeMakeAdmin && onToggleAdmin) {
    columns.push({
      id: "makeAdmin",
      header: t('components.usersDataTable.makeAdmin'),
      cell: ({row}) => {
        const user = row.original;
        return (
          <Switch
            checked={user.role === UserRoles.ADMIN}
            onCheckedChange={() => onToggleAdmin(user.id, user.role === UserRoles.ADMIN ? UserRoles.USER : UserRoles.ADMIN)}
          />
        )
      }
    })
  }

  if (includeBlock && onToggleBlock) {
    columns.push({
      id: "block",
      header: t('components.usersDataTable.block'),
      cell: ({row}) => {
        const user = row.original;
        return (
          <Switch
            checked={user.blocked}
            onCheckedChange={() => onToggleBlock(user.id, !user.blocked)}
          />
        )
      }
    })
  }

  if (includeActions && onViewDetails && onDelete) {
    columns.push({
      id: "actions",
      cell: ({row}) => {
        const user = row.original;
        const menuItems = [
          {id: "view", label: t("components.usersDataTable.view"), action: () => onViewDetails(user.id)},
          {id: "delete", label: t("components.usersDataTable.delete"), action: () => onDelete(user.id)},
        ]
        return (
          <DataTableDropdownMenu
            label={t("components.usersDataTable.label")}
            items={menuItems}
            triggerLabel={t("components.usersDataTable.triggerLabel")}
          />
        )
      }
    })
  }

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel<User>(),
    getPaginationRowModel: getPaginationRowModel<User>(),
    getSortedRowModel: getSortedRowModel<User>(),
    state: {
      sorting,
    }
  })

  return (
    <>
      <DataTable
        noDataMessage={t('components.usersDataTable.noDataMessage')}
        table={table}
        columns={columns}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </>
  )
}
