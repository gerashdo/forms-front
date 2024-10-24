import axios from "axios";
import { getEnvVariables } from "@/helpers/envVariables";
import { getTokenString } from "@/helpers/auth";
import {
  GetAllTagsResponse,
  GetAllTopicsResponse,
  GetTemplateResponse,
  GetTemplatesBySubmissionsResponse,
  GetTemplatesQueryParams,
  GetTemplatesResponse,
  PatchQuestionOrderResponse,
  PatchTemplateRequest,
  PatchTemplateResponse,
  PostNewTemplateRequest
} from "@/interfaces/template"
import { NewQuestionFormValues, PostQuestionResponse } from "@/interfaces/question";
import { ALLOWED_TEMPLATE_ORDER_BY, ALLOWED_TEMPLATE_ORDER_BY_FIELDS } from "@/constants/templates/template";


const BASE_URL = getEnvVariables().VITE_API_BACKEND_URL;

export const getAllTags = async () => {
  return axios.get<GetAllTagsResponse>(`${BASE_URL}/tags`)
}

export const getAllTopics = async () => {
  return axios.get<GetAllTopicsResponse>(`${BASE_URL}/topics`)
}

export const getTemplateById = async (id: string) => {
  return axios.get<GetTemplateResponse>(`${BASE_URL}/templates/${id}`).then((response) => response.data);
}

export const getTemplates = async (params: GetTemplatesQueryParams) => {
  return axios.get<GetTemplatesResponse>(`${BASE_URL}/templates`, {params}).then((response) => response.data);
}

export const getTemplatesBySubmissions = async () => {
  return axios.get<GetTemplatesBySubmissionsResponse>(`${BASE_URL}/templates/bysubmissions`).then((response) => response.data);
}

export const getMostRecentTemplates = async () => {
  const params: GetTemplatesQueryParams = {
    limit: 6,
    page: 1,
    orderBy: ALLOWED_TEMPLATE_ORDER_BY_FIELDS.createdAt,
    order: ALLOWED_TEMPLATE_ORDER_BY.DESC,
  }
  return axios.get<GetTemplatesResponse>(`${BASE_URL}/templates`, {params}).then((response) => response.data);
}

export const createTemplate = async ({token, data}:{token: string, data: PostNewTemplateRequest}) => {
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
      'Content-Type': 'multipart/form-data',
      'Authorization': getTokenString(token),
    }
  });
};

export const updateTemplate = async ({templateId, data, token}: {token: string, templateId: number, data: PatchTemplateRequest}) => {
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

  return axios.patch<PatchTemplateResponse>(`${BASE_URL}/templates/${templateId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': getTokenString(token),
    }
  });
}

export const deleteTemplate = async ({templateId, token}: {templateId: number, token: string}) => {
  return axios.delete(`${BASE_URL}/templates/${templateId}`, {
    headers: {'Authorization': getTokenString(token)}
  });
}

type AddQuestionToTemplateProps = {
  templateId: number;
  questionData: NewQuestionFormValues;
  token: string;
}

export const addQuestionToTemplate = async ({templateId, questionData, token}: AddQuestionToTemplateProps) => {
  return axios.post<PostQuestionResponse>(`${BASE_URL}/templates/${templateId}/questions`, questionData, 
    {headers: {'Authorization': getTokenString(token)}}
  );
}

type DeleteQuestionFromTemplateProps = {
  templateId: number;
  questionId: number;
  token: string;
}

export const deleteQuestionFromTemplate = async ({templateId, questionId, token}: DeleteQuestionFromTemplateProps) => {
  return axios.delete(`${BASE_URL}/templates/${templateId}/questions/${questionId}`, {
    headers: {'Authorization': getTokenString(token)}
  });
}

export const reorderTemplateQuestions = async ({token, templateId, questionIds}:{token: string, templateId: number, questionIds: number[]}) => {
  return axios.patch<PatchQuestionOrderResponse>(`${BASE_URL}/templates/${templateId}/reorder-questions`,
    {questionsOrder: questionIds},
    {headers: {'Authorization': getTokenString(token)}}
  );
}
