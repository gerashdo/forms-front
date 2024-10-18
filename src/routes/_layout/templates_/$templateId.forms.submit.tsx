import { getQuestionsByTemplateIdQuery } from '@/queries/question'
import { getTemplateByIdQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/templates/$templateId/forms/submit',
)({
  loader: async ({ context: { queryClient }, params: { templateId } }) => {
    queryClient.ensureQueryData(getQuestionsByTemplateIdQuery(templateId));
    queryClient.ensureQueryData(getTemplateByIdQuery(templateId));
  },
})
