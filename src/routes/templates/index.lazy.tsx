import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/templates/')({
  component: () => <div>Hello /templates/!</div>,
})
