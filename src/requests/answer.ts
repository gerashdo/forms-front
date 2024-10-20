import axios from "axios";
import { getEnvVariables } from "@/helpers/envVariables";
import { GetAnswersParams, GetAnswersResponse, PatchAnswerResponse } from "@/interfaces/answer";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getAnswers = async (params: GetAnswersParams) => {
  return axios.get<GetAnswersResponse>(`${BASE_URL}/answers`, {params})
    .then((response) => response.data);
}

export const updateAnswer = async ({answerId, value}: {answerId: number, value: string | number | boolean}) => {
  return axios.patch<PatchAnswerResponse>(`${BASE_URL}/answers/${answerId}`, {value});
}