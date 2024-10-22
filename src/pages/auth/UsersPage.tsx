import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersDataTable } from "@/components/auth/UsersDataTable";
import { useUpdateUserMutation } from "@/hooks/auth";
import { AuthState } from "@/state/auth";
import { getUsersQuery } from "@/queries/auth";
import { initialGetUsersParams } from '@/constants/auth/auth';
import { UserRoles } from "@/interfaces/auth";



export const UsersPage = () => {
  const {token} = useRecoilValue(AuthState);
  const [page, setPage] = useState<number>(initialGetUsersParams.page);
  const {startUpdateUser} = useUpdateUserMutation(page);
  const usersQuery = useSuspenseQuery(getUsersQuery(
    token || '',
    {...initialGetUsersParams, page},
  ))
  const users = usersQuery.data.data;

  const handleViewDetails = (userId: number) => {
    console.log('View details of user', userId);
  }

  const handleDelete = (userId: number) => {
    console.log('Delete user', userId);
  }

  const handleToggleAdmin = (userId: number, newRole: UserRoles) => {
    if (!token) return;
    startUpdateUser(userId, token, {role: newRole});
  }

  const handleBlock = (userId: number, blocked: boolean) => {
    if (!token) return;
    startUpdateUser(userId, token, {blocked});
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage the users and their roles here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersDataTable
            users={users}
            page={page}
            totalPages={usersQuery.data.meta.totalPages}
            onNextPage={() => setPage(page + 1)}
            onPreviousPage={() => setPage(page - 1)}
            includeMakeAdmin
            includeActions
            includeBlock
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
            onToggleAdmin={handleToggleAdmin}
            onToggleBlock={handleBlock}
          />
        </CardContent>
      </Card>
    </main>
  )
}
