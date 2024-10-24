import { ErrorCode } from "./errorsRequest";
import { QuestionTypes } from "./question";
import i18n from "@/i18n";


export type PostFormRequest = {
  userId: number;
  templateId: number;
  answers: PostFormRequestAnswer[];
}

export type PostFormRequestAnswer = {
  questionId: number;
  value: string | number | boolean;
  type: QuestionTypes;
}

export interface PostFormResponse {
  ok:   boolean;
  data: Form;
}

export interface GetFormResponse {
  ok:   boolean;
  data: Form;
}

export interface Form {
  id:             number;
  submissionDate: string;
  templateId:     number;
  userId:         number;
  User:           GetFormResponseUser;
  Template:       GetFormResponseTemplate;
}

export interface GetFormResponseTemplate {
  title:       string;
  description: string;
}

export interface GetFormResponseUser {
  email:    string;
  name:     string;
  lastName: string;
}

export interface GetFormsResponse {
  ok:   boolean;
  data: GetFormsResponseForm[];
  meta: GetFormsResponseMeta;
}

export interface GetFormsResponseForm {
  id:             number;
  submissionDate: string;
  User:           GetFormsResponseUser;
  Template:       GetFormsResponseTemplate;
}

export interface GetFormsResponseTemplate {
  title: string;
}

export interface GetFormsResponseUser {
  email: string;
}

export interface GetFormsResponseMeta {
  total:           number;
  page:            number;
  elementsPerPage: number;
}

export interface GetFormsQueryParams {
  limit: number;
  page:  number;
  orderBy: string;
  order: string;
  templateId?: number;
  userId?: number;
}

export const PostFormCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.postFormCodeMessage.400"),
  401: i18n.t("errors.postFormCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  422: i18n.t("errors.postFormCodeMessage.422"),
  500: i18n.t("errors.postFormCodeMessage.500"),
}

export const DeleteFormCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.deleteFormCodeMessage.400"),
  401: i18n.t("errors.deleteFormCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.deleteFormCodeMessage.500"),
}

export enum ALLOWED_FORM_ORDER_BY_FIELDS {
  submissionDate = "submissionDate",
}

export enum ALLOWED_FORM_ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}
