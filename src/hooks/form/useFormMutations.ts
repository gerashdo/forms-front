import { AxiosError } from "axios";
import { deleteForm, submitForm } from "@/requests/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { getDeleteFormError, getPostFormError } from "@/helpers/getErrorsRequest";
import { PostFormRequest } from "@/interfaces/form";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { useTranslation } from "react-i18next";


export const usePostFormMutation = () => {
  const {t} = useTranslation();
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["forms"]});
      toast({
        title: t("hooks.usePostFormMutation.successToast.title"),
        description: t("hooks.usePostFormMutation.successToast.description"),
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostFormError(responseCode);
      toast({
        title: t("hooks.usePostFormMutation.errorToast.title"),
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startSubmitForm = (form: PostFormRequest) => {
    mutation.mutate({data: form, token: authState.token || ''});
  }

  return {
    startSubmitForm,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}

export const useDeleteFormMutation = () => {
  const {t} = useTranslation();
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["forms"]});
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getDeleteFormError(responseCode);
      toast({
        title: t("hooks.useDeleteFormMutation.errorToast.title"),
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startDeleteForm = (formId: number) => {
    mutation.mutate({formId, token: authState.token || ''});
  }

  return {
    startDeleteForm,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
