import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersDataTable } from "@/components/auth/UsersDataTable";
import { AuthState } from "@/state/auth";
import { getUsersQuery } from "@/queries/auth";
import { initialGetUsersParams } from '@/constants/auth/auth';



export const UsersPage = () => {
  const {token} = useRecoilValue(AuthState);
  const [page, setPage] = useState<number>(initialGetUsersParams.page);
  const usersQuery = useSuspenseQuery(getUsersQuery(
    token || '',
    {...initialGetUsersParams, page},
  ))
  const users = usersQuery.data.data;

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
          />
        </CardContent>
      </Card>
    </main>
  )
}
