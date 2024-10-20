import { updateAnswer } from "@/requests/answer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { GetAnswersResponse, PatchAnswerResponse } from "@/interfaces/answer";
import { getPatchAnswerError } from "@/helpers/getErrorsRequest";


export const useUpdateAnswerMutation = (formId: number) => {
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
    mutation.mutate({answerId, value});
  }

  return {
    startUpdateAnswer,
    isLoading: mutation.isPending,
    success: mutation.isSuccess
  }
}
