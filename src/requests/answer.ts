import axios from "axios";
import { GetAnswersParams, GetAnswersResponse } from "@/interfaces/answer";
import { getEnvVariables } from "@/helpers/envVariables";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getAnswers = async (params: GetAnswersParams) => {
  return axios.get<GetAnswersResponse>(`${BASE_URL}/answers`, {params})
    .then((response) => response.data);
}
