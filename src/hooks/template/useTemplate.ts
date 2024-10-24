import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import { AuthState } from "@/state/auth";
import { addQuestionToTemplate, createTemplate, deleteQuestionFromTemplate, deleteTemplate, reorderTemplateQuestions, updateTemplate } from "@/requests/templates";
import { getDeleteQuestionError, getDeleteTemplateError, getPostNewTemplateError, getReorderQuestionsError } from "@/helpers/getErrorsRequest";
import { PatchQuestionOrderResponse, PatchTemplateRequest, PatchTemplateResponse, PostNewTemplateRequest, PostNewTemplateResponse } from "@/interfaces/template";
import { GetQuestionsResponse, NewQuestionFormValues, PostQuestionResponse } from "@/interfaces/question";
import { useTranslation } from "react-i18next";


type UseCreateTemplateProps = {
  onSuccess: (templateId: number) => void;
}

export const useCreateTemplate = ({onSuccess}: UseCreateTemplateProps) => {
  const {t} = useTranslation();
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
        title: t('hooks.useCreateTemplate.errorToast.title'),
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
  const {t} = useTranslation();
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTemplate,
    onSuccess: (data: AxiosResponse<PatchTemplateResponse>) => {
      const templateId = data.data.data.id.toString();
      queryClient.invalidateQueries({queryKey: ['template', {templateId}]});
      onSuccess(data.data.data.id);
      toast({
        title: t('hooks.useUpdateTemplateMutation.successToast.title'),
        description: t('hooks.useUpdateTemplateMutation.successToast.description'),
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostNewTemplateError(responseCode);
      toast({
        title: t('hooks.useUpdateTemplateMutation.errorToast.title'),
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
  const {t} = useTranslation();
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
        title: t('hooks.useDeleteTemplateMutation.errorToast.title'),
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
  const {t} = useTranslation();
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
        title: t('hooks.useAddQuestionToTemplate.successToast.title'),
        description: t('hooks.useAddQuestionToTemplate.successToast.description'),
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostNewTemplateError(responseCode);
      toast({
        title: t('hooks.useAddQuestionToTemplate.errorToast.title'),
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
  const {t} = useTranslation();
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteQuestionFromTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions', {templateId: templateId.toString()}]
      });
      toast({
        title: t('hooks.useDeleteQuestionFromTemplate.successToast.title'),
        description: t('hooks.useDeleteQuestionFromTemplate.successToast.description'),
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getDeleteQuestionError(responseCode);
      toast({
        title: t('hooks.useDeleteQuestionFromTemplate.errorToast.title'),
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
  const {t} = useTranslation();
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
        title: t('hooks.useReorderQuestionsMutation.errorToast.title'),
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
