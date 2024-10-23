import { AxiosError } from "axios";
import { submitForm } from "@/requests/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { getPostFormError } from "@/helpers/getErrorsRequest";
import { PostFormRequest } from "@/interfaces/form";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";


export const usePostFormMutation = () => {
  const authState = useRecoilValue(AuthState);
  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast({
        title: 'Form submitted',
        description: 'The form was submitted successfully',
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getPostFormError(responseCode);
      toast({
        title: 'Error submitting the form',
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
