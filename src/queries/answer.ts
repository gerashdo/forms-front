import { GetAnswersParams } from "@/interfaces/answer";
import { getAnswers } from "@/requests/answer";
import { queryOptions } from "@tanstack/react-query";


export const getAnswersQuery = (params: GetAnswersParams) => queryOptions({
  queryKey: ['answers', {formId: params.formId}],
  queryFn: () => getAnswers(params),
})
