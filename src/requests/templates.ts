import axios from "axios"
import { getEnvVariables } from "@/helpers/envVariables";
import { GetAllTagsResponse, GetAllTopicsResponse, GetTemplateResponse, PostNewTemplateRequest } from "@/interfaces/template"


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getAllTags = async () => {
  return axios.get<GetAllTagsResponse>(`${BASE_URL}/tags`)
}

export const getAllTopics = async () => {
  return axios.get<GetAllTopicsResponse>(`${BASE_URL}/topics`)
}

export const getTemplateById = async (id: string) => {
  return axios.get<GetTemplateResponse>(`${BASE_URL}/templates/${id}`)
}

export const createTemplate = async (data: PostNewTemplateRequest) => {
  const formData = new FormData();
  formData.append('userId', data.userId.toString());
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('topicId', data.topicId.toString());
  formData.append('tags', JSON.stringify(data.tags));
  formData.append('isPublic', data.isPublic.toString());
  if (data.image) {
    formData.append('image', data.image);
  }

  return axios.post(`${BASE_URL}/templates`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
