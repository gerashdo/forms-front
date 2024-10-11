import { TemplatePage } from '@/pages/template/TemplatePage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/templates/$templateId')({
  component: TemplatePage,
})
