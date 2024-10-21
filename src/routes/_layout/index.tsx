import { getTagsQuery } from '@/queries/template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getTagsQuery)
  },
})
