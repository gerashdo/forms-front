import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { login, signup } from '@/requests/auth';
import { LoginFormValues, SignupFormValues } from '@/interfaces/auth';
import { useToast } from './use-toast';
import { getLoginError, getSignUpError } from '@/helpers/getErrorsRequest';


export const useSingUp = () => {
  const {toast} = useToast();
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully'
      });
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getSignUpError(responseCode);
      toast({
        title: 'Error creating account',
        description: errorMessage,
        variant:'destructive',
      });
    }
  })

  const signUpUser = (data: SignupFormValues) => {
    mutation.mutate(data);
  }

  return {
    signUpUser,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  }
}

export const useLogin = () => {
  const {toast} = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('User logged in');
    },
    onError: (error: AxiosError) => {
      const responseCode = error.response?.status || 500;
      const errorMessage = getLoginError(responseCode);
      toast({
        description: errorMessage,
        variant:'destructive',
      });
    }
  })

  const loginUser = (data: LoginFormValues) => {
    mutation.mutate(data);
  }

  return {
    loginUser,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  }
}
