import { queryOptions } from "@tanstack/react-query";
import { getQuestionsByTemplateId } from "@/requests/questions";


export const getQuestionsByTemplateIdQuery = (templateId: string) => queryOptions({
  queryKey: ['questions', {templateId}],
  queryFn: () => getQuestionsByTemplateId(templateId),
})
