import { TemplatePage } from '@/pages/template/TemplatePage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/templates/$templateId')({
  component: TemplatePage,
})
