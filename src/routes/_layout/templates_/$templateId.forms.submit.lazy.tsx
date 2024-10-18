import { createLazyFileRoute } from '@tanstack/react-router'
import SubmitFormPage from '@/pages/form/SubmitFormPage'


export const Route = createLazyFileRoute(
  '/_layout/templates/$templateId/forms/submit',
)({
  component: SubmitFormPage,
})
