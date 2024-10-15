import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "@/hooks/use-toast"
import { addQuestionToTemplate, createTemplate } from "@/requests/templates"
import { getPostNewTemplateError } from "@/helpers/getErrorsRequest"
import { PostNewTemplateRequest, PostNewTemplateResponse } from "@/interfaces/template"
import { GetQuestionsResponse, NewQuestionFormValues, PostQuestionResponse } from "@/interfaces/question"


type UseCreateTemplateProps = {
  onSuccess: (templateId: number) => void;
}

export const useCreateTemplate = ({onSuccess}: UseCreateTemplateProps) => {
  const mutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: (data: AxiosResponse<PostNewTemplateResponse>) => {
      const templateId = data.data.data.id;
      onSuccess(templateId);
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostNewTemplateError(responseCode);
      toast({
        title: 'Error creating the template',
        description: errorMessage,
        variant:'destructive',
      });
    }
  })

  const startCreateTemplate = (data: PostNewTemplateRequest) => {
    mutation.mutate(data);
  }

  return {
    startCreateTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  }
}

export const useAddQuestionToTemplate = (templateId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addQuestionToTemplate,
    onSuccess: (data: AxiosResponse<PostQuestionResponse>) => {
      queryClient.setQueryData(['questions', {templateId: templateId.toString()}], (oldData: GetQuestionsResponse) => {
        const newQuestion = data.data.data;
        return {
          ...oldData,
          data: [
            ...oldData.data,
            newQuestion
          ]
        }
      });
      toast({
        title: 'Question added to the template',
        description: 'The question was added successfully',
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostNewTemplateError(responseCode);
      toast({
        title: 'Error adding the question',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startAddQuestionToTemplate = (templateId: number, questionData: NewQuestionFormValues) => {
    mutation.mutate({templateId, questionData});
  }

  return {
    startAddQuestionToTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
