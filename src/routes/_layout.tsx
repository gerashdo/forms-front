import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: () => (
      <div className='container mx-auto mt-4'>
        <Outlet />
      </div>
    ),
})
