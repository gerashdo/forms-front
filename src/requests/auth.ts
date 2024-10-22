import axios from 'axios';
import { getTokenString } from '@/helpers/auth';
import { getEnvVariables } from '@/helpers/envVariables';
import { GetUserByIdResponse, GetUsersParams, GetUsersResponse, LoginFormValues, LoginResponse, PatchUserRequestBody, SignupFormValues, SignUpResponse } from '@/interfaces/auth';


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const login = async (data: LoginFormValues) => {
  return axios.post<LoginResponse>(`${BASE_URL}/auth/login`, data)
}

export const signup = async (data: SignupFormValues) => {
  return axios.post<SignUpResponse>(`${BASE_URL}/auth/signup`, data)
}

export const getUsers = async ({userToken, params}:{ userToken: string, params: GetUsersParams}) => {
  return axios.get<GetUsersResponse>(`${BASE_URL}/auth/users`, {
    headers: {
      Authorization: getTokenString(userToken),
    },
    params,
  }).then(res => res.data);
}

export const updateUser = async ({userToken, userToUpdateId, data}:{ userToken: string, userToUpdateId: number, data: PatchUserRequestBody}) => {
  return axios.patch(`${BASE_URL}/auth/users/${userToUpdateId}`, data, {
    headers: {
      Authorization: getTokenString(userToken),
    },
  })
}

export const getUserById = async ({userToken, userId}:{userToken: string, userId: number}) => {
  return axios.get<GetUserByIdResponse>(`${BASE_URL}/auth/users/${userId}`, {
    headers: {
      Authorization: getTokenString(userToken),
    },
  }).then(res => res.data);
}
