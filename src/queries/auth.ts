import { GetUsersParams } from "@/interfaces/auth";
import { getUsers } from "@/requests/auth";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";


export const getUsersQuery = (token: string, params: GetUsersParams) => queryOptions({
  queryKey: ['users', {page: params.page}],
  queryFn: () => getUsers({userToken: token, params}),
  placeholderData: keepPreviousData,
})
