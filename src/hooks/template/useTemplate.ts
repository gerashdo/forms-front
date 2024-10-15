import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "@/hooks/use-toast"
import { addQuestionToTemplate, createTemplate, deleteQuestionFromTemplate, reorderTemplateQuestions } from "@/requests/templates"
import { getDeleteQuestionError, getPostNewTemplateError, getReorderQuestionsError } from "@/helpers/getErrorsRequest"
import { PatchQuestionOrderResponse, PostNewTemplateRequest, PostNewTemplateResponse } from "@/interfaces/template"
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

export const useDeleteQuestionFromTemplate = (templateId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteQuestionFromTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions', {templateId: templateId.toString()}]
      });
      toast({
        title: 'Question deleted from the template',
        description: 'The question was deleted successfully',
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getDeleteQuestionError(responseCode);
      toast({
        title: 'Error adding the question',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startDeleteQuestionFromTemplate = (templateId: number, questionId: number) => {
    mutation.mutate({templateId, questionId});
  }

  return {
    startDeleteQuestionFromTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}

export const useReorderQuestionsMutation = (templateId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: reorderTemplateQuestions,
    onSuccess: (data: AxiosResponse<PatchQuestionOrderResponse>) => {
      queryClient.setQueryData(['questions', {templateId: templateId.toString()}], (oldData: GetQuestionsResponse) => {
        const questionsInNewOrder = data.data.data;
        return {
          ...oldData,
          data: questionsInNewOrder,
        }
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getReorderQuestionsError(responseCode);
      toast({
        title: 'Error reordering the questions',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startReorderQuestions = (questionIds: number[]) => {
    mutation.mutate({templateId, questionIds});
  }

  return {
    startReorderQuestions,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
