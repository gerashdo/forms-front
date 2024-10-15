import { getQuestionsByTemplateIdQuery } from '@/queries/question'
import { getTagsQuery, getTemplateByIdQuery, getTopicsQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/templates/$templateId')({
  loader: async ({ context: { queryClient }, params: { templateId } }) => {
    queryClient.ensureQueryData(getTopicsQuery)
    queryClient.ensureQueryData(getTagsQuery)
    queryClient.ensureQueryData(getTemplateByIdQuery(templateId))
    queryClient.ensureQueryData(getQuestionsByTemplateIdQuery(templateId))
  },
})
