import { useSuspenseQuery } from "@tanstack/react-query"
import { getTagsQuery, getTopicsQuery } from "@/queries/template"


export const useTagsTopics = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)
  const topicsQuery = useSuspenseQuery(getTopicsQuery)

  return {
    tags: tagsQuery.data.data.data,
    topics: topicsQuery.data.data.data,
  }
}

export const useTags = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)

  return tagsQuery.data.data.data
}
