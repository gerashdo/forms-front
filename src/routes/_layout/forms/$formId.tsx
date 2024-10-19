import { getAnswersQuery } from '@/queries/answer'
import { getFormQuery } from '@/queries/form'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_layout/forms/$formId')({
  loader: async ({context: {queryClient}, params: {formId}}) => {
    queryClient.ensureQueryData(getFormQuery(Number(formId)))
    queryClient.ensureQueryData(getAnswersQuery({formId: Number(formId)}))
  },
});
