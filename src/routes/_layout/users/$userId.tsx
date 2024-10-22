import { createFileRoute } from '@tanstack/react-router';
import { getAuthStateSnapshot } from '@/helpers/auth';
import { getUserByIdQuery } from '@/queries/auth';


export const Route = createFileRoute('/_layout/users/$userId')({
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    const authStat = getAuthStateSnapshot()
    queryClient.ensureQueryData(
      getUserByIdQuery(authStat.token || '', Number(userId)),
    )
  },
})
