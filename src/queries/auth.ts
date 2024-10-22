import { GetUsersParams } from "@/interfaces/auth";
import { getUsers } from "@/requests/auth";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";


export const getUsersQuery = (token: string, params: GetUsersParams) => queryOptions({
  queryKey: ['users', {params, token}],
  queryFn: () => getUsers({userToken: token, params}),
  placeholderData: keepPreviousData,
})
