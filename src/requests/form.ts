import axios from "axios";
import { getEnvVariables } from "@/helpers/envVariables";
import { GetFormsQueryParams, GetFormsResponse, PostFormRequest, PostFormResponse } from "@/interfaces/form";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const submitForm = async (data: PostFormRequest) => {
  return axios.post<PostFormResponse>(`${BASE_URL}/forms/submit`, data);
}

export const getForms = async (params: GetFormsQueryParams) => {
  return axios.get<GetFormsResponse>(`${BASE_URL}/forms`, {params}).then((response) => response.data);
}
