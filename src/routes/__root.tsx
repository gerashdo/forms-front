import { CommonPage } from '@/pages/CommonPage'
import { createRootRoute, Outlet } from '@tanstack/react-router'


export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <CommonPage />
    </>
  )
})
