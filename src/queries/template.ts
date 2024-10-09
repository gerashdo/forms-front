import { getAllTags, getAllTopics } from "@/requests/templates";
import { queryOptions } from "@tanstack/react-query";


export const getTopicsQuery = queryOptions({
  queryKey: ['topics'],
  queryFn: getAllTopics,
})

export const getTagsQuery = queryOptions({
  queryKey: ['tags'],
  queryFn: getAllTags,
})
