import { createFileRoute, redirect } from '@tanstack/react-router';
import { getUsersQuery } from '@/queries/auth';
import { getAuthStateSnapshot, isAuthenticated, isUserAdmin } from '@/helpers/auth';
import { initialGetUsersParams } from '@/constants/auth/auth';


export const Route = createFileRoute('/_layout/users/')({
  beforeLoad: () => {
    const authState = getAuthStateSnapshot()
    if (!isAuthenticated(authState) || !isUserAdmin(authState.user || undefined)) {
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({context: {queryClient}}) => {
    const authState = getAuthStateSnapshot()
    queryClient.ensureQueryData(getUsersQuery(
      authState.token || '',
      {...initialGetUsersParams}
    ))
  },
})
