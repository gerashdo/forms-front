import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import { AuthState } from "@/state/auth";
import { addQuestionToTemplate, createTemplate, deleteQuestionFromTemplate, deleteTemplate, reorderTemplateQuestions, updateTemplate } from "@/requests/templates";
import { getDeleteQuestionError, getDeleteTemplateError, getPostNewTemplateError, getReorderQuestionsError } from "@/helpers/getErrorsRequest";
import { PatchQuestionOrderResponse, PatchTemplateRequest, PatchTemplateResponse, PostNewTemplateRequest, PostNewTemplateResponse } from "@/interfaces/template";
import { GetQuestionsResponse, NewQuestionFormValues, PostQuestionResponse } from "@/interfaces/question";


type UseCreateTemplateProps = {
  onSuccess: (templateId: number) => void;
}

export const useCreateTemplate = ({onSuccess}: UseCreateTemplateProps) => {
  const authState = useRecoilValue(AuthState);
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
    mutation.mutate({token: authState.token || '', data});
  }

  return {
    startCreateTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  }
}

export const useUpdateTemplateMutation = ({onSuccess}: UseCreateTemplateProps) => {
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTemplate,
    onSuccess: (data: AxiosResponse<PatchTemplateResponse>) => {
      const templateId = data.data.data.id.toString();
      queryClient.invalidateQueries({queryKey: ['template', {templateId}]});
      onSuccess(data.data.data.id);
      toast({
        title: 'Template updated',
        description: 'The template was updated successfully',
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostNewTemplateError(responseCode);
      toast({
        title: 'Error updating the template',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startUpdateTemplate = (templateId: number, data: PatchTemplateRequest) => {
    mutation.mutate({templateId, data, token: authState.token || ''});
  }

  return {
    startUpdateTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  }
}

export const useDeleteTemplateMutation = () => {
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['templates']})
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getDeleteTemplateError(responseCode);
      toast({
        title: 'Error deleting the template',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startDeleteTemplate = (templateId: number) => {
    mutation.mutate({templateId, token: authState.token || ''});
  }

  return {
    startDeleteTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}

export const useAddQuestionToTemplate = (templateId: number) => {
  const authState = useRecoilValue(AuthState);
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
    mutation.mutate({templateId, questionData, token: authState.token || ''});
  }

  return {
    startAddQuestionToTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}

export const useDeleteQuestionFromTemplate = (templateId: number) => {
  const authState = useRecoilValue(AuthState);
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
    mutation.mutate({templateId, questionId, token: authState.token || ''});
  }

  return {
    startDeleteQuestionFromTemplate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}

export const useReorderQuestionsMutation = (templateId: number) => {
  const authState = useRecoilValue(AuthState);
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
    mutation.mutate({templateId, questionIds, token: authState.token || ''});
  }

  return {
    startReorderQuestions,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
