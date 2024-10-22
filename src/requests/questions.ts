import axios from "axios"
import { getEnvVariables } from "@/helpers/envVariables";
import { GetQuestionsResponse, PatchQuestionRequest, PatchQuestionResponse } from "@/interfaces/question";
import { getTokenString } from "@/helpers/auth";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getQuestionsByTemplateId = async (templateId: string) => {
  return axios.get<GetQuestionsResponse>(`${BASE_URL}/questions`, {
    params: {
      templateId
    }
  }).then((response) => response.data);
}

export const updateQuestion = async ({questionId, data, token}: {token: string, questionId: number, data: PatchQuestionRequest}) => {
  return axios.patch<PatchQuestionResponse>(`${BASE_URL}/questions/${questionId}`, data, 
    { headers: { Authorization: getTokenString(token) } }
  );
}
