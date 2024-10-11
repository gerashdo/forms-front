import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/templates/$templateId/edit')(
  {
    component: () => <div>Hello /templates/$templateId/edit!</div>,
  },
)
