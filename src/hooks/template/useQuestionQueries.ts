import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { toast } from "@/hooks/use-toast";
import { updateQuestion } from "@/requests/questions"
import { getUpdateQuestionError } from "@/helpers/getErrorsRequest";
import { GetQuestionsResponse, PatchQuestionRequest } from "@/interfaces/question"
import { useTranslation } from "react-i18next";


export const useUpdateQuestionMutation = (templateId: string) => {
  const {t} = useTranslation();
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: (data) => {
      const updatedQuestion = data.data.data
      queryClient.setQueryData(['questions', {templateId}], (oldData: GetQuestionsResponse) => {
        const updatedQuestions = oldData.data.map((question) => question.id === updatedQuestion.id ? updatedQuestion : question)
        return {
          ...oldData,
          data: updatedQuestions
        }
      })
      toast({
        title: t('hooks.useUpdateQuestionMutation.successToast.title'),
        description: t('hooks.useUpdateQuestionMutation.successToast.description'),
      })
    },
    onError: (error: AxiosError) => {
      const errorCode = error.response?.status || 500
      const errorMessage = getUpdateQuestionError(errorCode)
      toast({
        title: t('hooks.useUpdateQuestionMutation.errorToast.title'),
        description: errorMessage,
        variant: 'destructive',
      })
    }
  })

  const startUpdateQuestion = (questionId: number, data: PatchQuestionRequest) => {
    mutation.mutate({questionId, data, token: authState.token || ''})
  }

  return {
    startUpdateQuestion,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
