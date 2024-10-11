import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/templates/')({
  component: () => <div>Hello /templates/!</div>,
})
