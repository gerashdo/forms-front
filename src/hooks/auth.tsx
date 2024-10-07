import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { login, signup } from '@/requests/auth';
import { useToast } from './use-toast';
import { AuthState } from '@/state/auth';
import { getLoginError, getSignUpError } from '@/helpers/getErrorsRequest';
import { LoginFormValues, LoginResponse, SignupFormValues } from '@/interfaces/auth';


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
  const setAuthState = useSetRecoilState(AuthState);
  const {toast} = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: AxiosResponse<LoginResponse>) => {
      setAuthState({
        user: data.data.data.user,
        token: data.data.data.token,
      });
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
