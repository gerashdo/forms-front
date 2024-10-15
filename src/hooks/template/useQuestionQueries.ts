import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetQuestionsResponse, PatchQuestionRequest } from "@/interfaces/question"
import { updateQuestion } from "@/requests/questions"
import { toast } from "../use-toast";
import { AxiosError } from "axios";
import { getUpdateQuestionError } from "@/helpers/getErrorsRequest";


export const useUpdateQuestionMutation = (templateId: string) => {
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
        title: 'Question updated',
        description: 'The question has been updated successfully',
      })
    },
    onError: (error: AxiosError) => {
      const errorCode = error.response?.status || 500
      const errorMessage = getUpdateQuestionError(errorCode)
      console.log(error)
      toast({
        title: 'Error updating the question',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  })

  const startUpdateQuestion = (questionId: number, data: PatchQuestionRequest) => {
    mutation.mutate({questionId, data})
  }

  return {
    startUpdateQuestion,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
