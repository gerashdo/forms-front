import { ErrorCode } from "./errorsRequest";
import { QuestionTypes } from "./question";


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
  400: 'Invalid data, please check the data for the form submission',
  401: 'Please login to submit the form, the session has expired',
  422: 'The form submission could not be processed, please check that all the questions are answered, or if you have already submitted the form',
  500: 'There was an error processing your request. Please try again later',
}

export const DeleteFormCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'The form you are trying to delete does not exist',
  401: 'Please login to delete the form, the session has expired',
  403: 'You do not have permission to delete this form',
  500: 'There was an error processing your request. Please try again later',
}

export enum ALLOWED_FORM_ORDER_BY_FIELDS {
  submissionDate = "submissionDate",
}

export enum ALLOWED_FORM_ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}
