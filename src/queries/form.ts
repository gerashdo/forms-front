import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { GetFormsQueryParams } from "@/interfaces/form";
import { getFormById, getForms } from "@/requests/form";


export const getFormsQuery = (params: GetFormsQueryParams) => queryOptions({
  queryKey: ['forms', {
    page: params.page,
  }],
  queryFn: () => getForms(params),
  placeholderData: keepPreviousData,
})

export const getFormQuery = (formId: number) => queryOptions({
  queryKey: ['form', {formId}],
  queryFn: () => getFormById(formId),
})
