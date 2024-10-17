import axios from "axios"
import { getEnvVariables } from "@/helpers/envVariables";
import {
  GetAllTagsResponse,
  GetAllTopicsResponse,
  GetTemplateResponse,
  GetTemplatesResponse,
  PatchQuestionOrderResponse,
  PatchTemplateRequest,
  PatchTemplateResponse,
  PostNewTemplateRequest
} from "@/interfaces/template"
import { NewQuestionFormValues, PostQuestionResponse } from "@/interfaces/question";


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

export const getMostRecentTemplates = async () => {
  return axios.get<GetTemplatesResponse>(`${BASE_URL}/templates`, {
    params: {
      limit: 6,
      page: 1,
      orderBy: 'createdAt',
      order: 'DESC'
    }
  }).then((response) => response.data);
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

export const updateTemplate = async ({templateId, data}: {templateId: number, data: PatchTemplateRequest}) => {
  const formData = new FormData();
  if (data.title) {
    formData.append('title', data.title);
  }
  if (data.description) {
    formData.append('description', data.description);
  }
  if (data.topicId) {
    formData.append('topicId', data.topicId.toString());
  }
  if (data.tags) {
    formData.append('tags', JSON.stringify(data.tags));
  }
  if (data.isPublic !== undefined) {
    formData.append('isPublic', data.isPublic.toString());
  }
  if (data.image !== undefined) {
    formData.append('image', data.image);
  }
  console.log('data to update', data);
  return axios.patch<PatchTemplateResponse>(`${BASE_URL}/templates/${templateId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

type AddQuestionToTemplateProps = {
  templateId: number;
  questionData: NewQuestionFormValues;
}

export const addQuestionToTemplate = async ({templateId, questionData}: AddQuestionToTemplateProps) => {
  return axios.post<PostQuestionResponse>(`${BASE_URL}/templates/${templateId}/questions`, questionData);
}

type DeleteQuestionFromTemplateProps = {
  templateId: number;
  questionId: number;
}

export const deleteQuestionFromTemplate = async ({templateId, questionId}: DeleteQuestionFromTemplateProps) => {
  return axios.delete(`${BASE_URL}/templates/${templateId}/questions/${questionId}`);
}

export const reorderTemplateQuestions = async ({templateId, questionIds}:{templateId: number, questionIds: number[]}) => {
  return axios.patch<PatchQuestionOrderResponse>(`${BASE_URL}/templates/${templateId}/reorder-questions`, {questionsOrder: questionIds});
}
