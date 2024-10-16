import * as z from "zod";
import { newQuestionSchema } from "@/constants/templates/question";
import { ErrorCode } from "./errorsRequest";


export type NewQuestionFormValues = z.infer<typeof newQuestionSchema>;

export enum QuestionTypes {
  MULTIPLE = 'multiple',
  BOOLEAN = 'boolean',
  TEXT = 'text',
  INTEGER = 'integer',
}

export interface PostQuestionResponse {
  ok:   boolean;
  data: Question;
}

export interface Question {
  id:          number;
  title:       string;
  description: string;
  visible:     boolean;
  type:        QuestionTypes;
  sequence:    number;
  templateId:  number;
}

export interface GetQuestionsResponse {
  ok:   boolean;
  data: Question[];
}

export interface PatchQuestionResponse {
  ok:   boolean;
  data: Question;
}

export type PatchQuestionRequest = Omit<Partial<Question>, "id" | "templateId">;

export const CreateNewQuestionCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check the data for the question',
  500: 'There was an error processing your request. Please try again later',
}

export const DeleteQuestionFromTemplateCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, template or question not found, please check the data',
  500: 'There was an error processing your request. Please try again later',
}

export const ReorderQuestionsCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'The order of the questions could not be updated',
  500: 'There was an error processing your request. Please try again later',
}

export const UpdateQuestionsCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid data, please check the data for the question',
  500: 'There was an error processing your request. Please try again later',
}
