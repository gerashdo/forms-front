import { GetTemplatesQueryParams } from "@/interfaces/template";
import { getAllTags, getAllTopics, getMostRecentTemplates, getTemplateById, getTemplates } from "@/requests/templates";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";


export const getTopicsQuery = queryOptions({
  queryKey: ['topics'],
  queryFn: getAllTopics,
})

export const getTagsQuery = queryOptions({
  queryKey: ['tags'],
  queryFn: getAllTags,
})

export const getTemplateByIdQuery = (templateId: string) => queryOptions({
  queryKey: ['template', {templateId}],
  queryFn: () => getTemplateById(templateId),
})

export const getRecentTemplatesQuery = queryOptions({
  queryKey: ['recentTemplates'],
  queryFn: getMostRecentTemplates,
})

export const getTemplatesQuery = (params: GetTemplatesQueryParams) => queryOptions({
  queryKey: ['templates', {page: params.page}],
  queryFn: () => getTemplates(params),
  placeholderData: keepPreviousData,
})
