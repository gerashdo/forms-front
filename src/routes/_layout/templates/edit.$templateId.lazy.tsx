import { TemplatePageEdit } from '@/pages/template/TemplatePageEdit'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/templates/edit/$templateId')(
  {
    component: TemplatePageEdit,
  },
)
