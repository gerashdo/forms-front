import axios from "axios";
import { getEnvVariables } from "@/helpers/envVariables";
import { PostFormRequest, PostFormResponse } from "@/interfaces/form";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const submitForm = async (data: PostFormRequest) => {
  return axios.post<PostFormResponse>(`${BASE_URL}/forms/submit`, data);
}
