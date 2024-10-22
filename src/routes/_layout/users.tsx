import { getAuthStateSnapshot, isAuthenticated, isUserAdmin } from '@/helpers/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
  beforeLoad: () => {
    const authState = getAuthStateSnapshot()
    if (!isAuthenticated(authState) || !isUserAdmin(authState.user || undefined)) {
      throw redirect({
        to: '/',
      })
    }
  },
})
