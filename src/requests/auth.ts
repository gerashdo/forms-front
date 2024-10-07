import { getEnvVariables } from '@/helpers/envVariables';
import { LoginFormValues, LoginResponse, SignupFormValues, SignUpResponse } from '@/interfaces/auth';
import axios from 'axios';

const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const login = async (data: LoginFormValues) => {
  return axios.post<LoginResponse>(`${BASE_URL}/auth/login`, data)
}

export const signup = async (data: SignupFormValues) => {
  return axios.post<SignUpResponse>(`${BASE_URL}/auth/signup`, data)
}
