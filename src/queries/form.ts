import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { GetFormsQueryParams } from "@/interfaces/form";
import { getForms } from "@/requests/form";


export const getFormsQuery = (params: GetFormsQueryParams) => queryOptions({
  queryKey: ['formsList', {
    page: params.page,
    userId: params.userId,
    templateId: params.templateId,
  }],
  queryFn: () => getForms(params),
  placeholderData: keepPreviousData,
})
