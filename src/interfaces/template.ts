import * as z from 'zod';
import { Question } from './question';
import { ALLOWED_TEMPLATE_ORDER_BY, ALLOWED_TEMPLATE_ORDER_BY_FIELDS, newTemplateSchema } from '@/constants/templates/template';
import { ErrorCode } from './errorsRequest';


export type NewTemplateFormValues = z.infer<typeof newTemplateSchema>;

export interface PostNewTemplateRequest extends NewTemplateFormValues {
  userId: number;
}

export type PatchTemplateRequest = Partial<NewTemplateFormValues>;

export interface PostNewTemplateResponse {
  ok:   boolean;
  data: Template;
}

export interface PatchTemplateResponse {
  ok:   boolean;
  data: Template;
}

export interface Template {
  id:          number;
  title:       string;
  description: string;
  image:       null;
  isPublic:    boolean;
  createdAt:   Date;
  User:        User;
  Topic:       Topic;
  Tags:        Tag[];
}

export interface GetTemplateResponse {
  ok:   boolean;
  data: Template;
}

export interface GetTemplatesQueryParams {
  limit:    number;
  page:     number;
  orderBy:  ALLOWED_TEMPLATE_ORDER_BY_FIELDS;
  order:    ALLOWED_TEMPLATE_ORDER_BY;
  userId?:  number;
}

export interface GetTemplatesResponse {
  ok:   boolean;
  data: Template[];
  meta: MetaGetTemplates;
}

export interface MetaGetTemplates {
  total:           number;
  page:            number;
  elementsPerPage: number;
}

export interface Topic {
  id:   number;
  name: string;
}

export interface User {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
}


export interface User {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
}

export interface GetAllTagsResponse {
  ok:   boolean;
  data: Tag[];
}

export interface Tag {
  id:   number;
  name: string;
}

export interface GetAllTopicsResponse {
  ok:   boolean;
  data: Topic[];
}

export interface PatchQuestionOrderResponse {
  ok:   boolean;
  data: Question[];
}

export const CreateNewTemplateCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check the data for the template',
  401: 'Please log in againt to create a new template, the session has expired',
  500: 'There was an error processing your request. Please try again later',
}
