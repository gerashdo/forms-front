import { getPostNewTemplateError } from "@/helpers/getErrorsRequest"
import { createTemplate } from "@/requests/templates"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "@/hooks/use-toast"
import { PostNewTemplateRequest, PostNewTemplateResponse } from "@/interfaces/template"


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
