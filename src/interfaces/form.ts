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

export interface Form {
  id:             number;
  submissionDate: Date;
  templateId:     number;
  userId:         number;
  Answers:        Answer[];
}

export interface Answer {
  id:                    number;
  questionId:            number;
  textValue:             string | null;
  numberValue:           number | null;
  booleanValue:          boolean | null;
  multipleTextLineValue: string | null;
}

export interface GetFormsResponse {
  ok:   boolean;
  data: GetFormsResponseForm[];
  meta: GetFormsResponseMeta;
}

export interface GetFormsResponseForm {
  id:             number;
  submissionDate: Date;
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
  422: 'The form submission could not be processed, please check that all the questions are answered, or if you have already submitted the form',
  500: 'There was an error processing your request. Please try again later',
}

export enum ALLOWED_FORM_ORDER_BY_FIELDS {
  submissionDate = "submissionDate",
}

export enum ALLOWED_FORM_ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}
