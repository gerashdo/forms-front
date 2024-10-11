import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/templates/')({
  component: () => <div>Hello /templates/!</div>,
})
