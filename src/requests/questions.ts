import axios from "axios"
import { getEnvVariables } from "@/helpers/envVariables";
import { GetQuestionsResponse } from "@/interfaces/question";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getQuestionsByTemplateId = async (templateId: string) => {
  return axios.get<GetQuestionsResponse>(`${BASE_URL}/questions`, {
    params: {
      templateId
    }
  }).then((response) => response.data);
}
