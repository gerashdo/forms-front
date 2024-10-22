import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getUserById, getUsers } from "@/requests/auth";
import { GetUsersParams } from "@/interfaces/auth";


export const getUsersQuery = (token: string, params: GetUsersParams) => queryOptions({
  queryKey: ['users', {page: params.page}],
  queryFn: () => getUsers({userToken: token, params}),
  placeholderData: keepPreviousData,
})

export const getUserByIdQuery = (token: string, userId: number) => queryOptions({
  queryKey: ['users', {userId}],
  queryFn: () => getUserById({userToken: token, userId}),
})
