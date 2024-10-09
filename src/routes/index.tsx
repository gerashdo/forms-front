import { getTagsQuery, getTopicsQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: ({context: {queryClient}}) => {
    queryClient.ensureQueryData(getTopicsQuery)
    queryClient.ensureQueryData(getTagsQuery)
  }
})
