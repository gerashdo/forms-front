import * as z from 'zod';
import { Question } from './question';
import { ALLOWED_TEMPLATE_ORDER_BY, ALLOWED_TEMPLATE_ORDER_BY_FIELDS, newTemplateSchema } from '@/constants/templates/template';
import { ErrorCode } from './errorsRequest';
import i18n from '@/i18n';


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
  submissions?: string;
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

export interface GetTemplatesBySubmissionsResponse {
  ok:   boolean;
  data: Template[];
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
  400: i18n.t("errors.createNewTemplateCodeMessage.400"),
  401: i18n.t("errors.createNewTemplateCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.createNewTemplateCodeMessage.500"),
}

export const DeleteTemplateErrorCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.deleteTemplateErrorCodeMessage.400"),
  401: i18n.t("errors.deleteTemplateErrorCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.deleteTemplateErrorCodeMessage.500"),
}
