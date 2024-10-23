import axios from "axios";
import { getEnvVariables } from "@/helpers/envVariables";
import { getTokenString } from "@/helpers/auth";
import { GetFormResponse, GetFormsQueryParams, GetFormsResponse, PostFormRequest, PostFormResponse } from "@/interfaces/form";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const submitForm = async ({data, token}: {data: PostFormRequest, token: string}) => {
  return axios.post<PostFormResponse>(`${BASE_URL}/forms/submit`, data,
    {headers: {Authorization: getTokenString(token)}}
  );
}

export const getForms = async (params: GetFormsQueryParams) => {
  return axios.get<GetFormsResponse>(`${BASE_URL}/forms`, {params}).then((response) => response.data);
}

export const getFormById = async (formId: number) => {
  return axios.get<GetFormResponse>(`${BASE_URL}/forms/${formId}`).then((response) => response.data);
}
