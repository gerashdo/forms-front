import { getTemplateByIdQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/templates/$templateId/edit')({
  loader: async ({ context: { queryClient }, params: { templateId } }) => {
    queryClient.ensureQueryData(getTemplateByIdQuery(templateId))
  },
})
