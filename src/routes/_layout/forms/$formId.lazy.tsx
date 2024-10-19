import FormPage from '@/pages/form/FormPage'
import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/_layout/forms/$formId')({
  component: FormPage,
})
