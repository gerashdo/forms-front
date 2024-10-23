import { AxiosError, AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthState } from "@/state/auth";
import { toast } from "@/hooks/use-toast";
import { updateAnswer } from "@/requests/answer";
import { getPatchAnswerError } from "@/helpers/getErrorsRequest";
import { GetAnswersResponse, PatchAnswerResponse } from "@/interfaces/answer";


export const useUpdateAnswerMutation = (formId: number) => {
  const authState = useRecoilValue(AuthState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateAnswer,
    onSuccess: (data: AxiosResponse<PatchAnswerResponse>) => {
      queryClient.setQueryData(['answers', {formId}], (oldData: GetAnswersResponse) => {
        const updatedAnswers = oldData.data.map(answer => {
          if (answer.id === data.data.data.id) {
            return data.data.data;
          }
          return answer;
        });
        return {
          ...oldData,
          data: updatedAnswers
        }
      });
      toast({
        title: 'Answer updated',
        description: 'The answer was updated successfully',
      });
    },
    onError: (error: AxiosError) => {
      console.log({error});
      const responseCode = error.response?.status || 500;
      const errorMessage = getPatchAnswerError(responseCode);
      toast({
        title: 'Error updating the answer',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  })

  const startUpdateAnswer = (answerId: number, value: string | number | boolean) => {
    mutation.mutate({answerId, value, token: authState.token || ''});
  }

  return {
    startUpdateAnswer,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
