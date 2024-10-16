import { getAllTags, getAllTopics, getMostRecentTemplates, getTemplateById } from "@/requests/templates";
import { queryOptions } from "@tanstack/react-query";


export const getTopicsQuery = queryOptions({
  queryKey: ['topics'],
  queryFn: getAllTopics,
})

export const getTagsQuery = queryOptions({
  queryKey: ['tags'],
  queryFn: getAllTags,
})

export const getTemplateByIdQuery = (templateId: string) => queryOptions({
  queryKey: ['template', templateId],
  queryFn: () => getTemplateById(templateId),
})

export const getRecentTemplatesQuery = queryOptions({
  queryKey: ['recentTemplates'],
  queryFn: getMostRecentTemplates,
})
