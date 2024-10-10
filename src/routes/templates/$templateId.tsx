import { getTemplateByIdQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/templates/$templateId')({
  loader: async ({context: {queryClient}, params: {templateId}}) => {
    queryClient.ensureQueryData(getTemplateByIdQuery(templateId))
  }
})
