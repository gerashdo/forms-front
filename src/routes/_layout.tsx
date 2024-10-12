import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: () => (
      <div className='container mx-auto mt-6 min-h-screen'>
        <Outlet />
      </div>
    ),
})
