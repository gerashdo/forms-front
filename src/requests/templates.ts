import axios from "axios"
import { getEnvVariables } from "@/helpers/envVariables";
import { GetAllTagsResponse, GetAllTopicsResponse } from "@/interfaces/template"


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getAllTags = async () => {
  return axios.get<GetAllTagsResponse>(`${BASE_URL}/tags`)
}

export const getAllTopics = async () => {
  return axios.get<GetAllTopicsResponse>(`${BASE_URL}/topics`)
}
