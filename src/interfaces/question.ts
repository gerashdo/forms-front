import * as z from "zod";
import { newQuestionSchema } from "@/constants/templates/question";
import { ErrorCode } from "./errorsRequest";
import i18n from "@/i18n";


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
  400: i18n.t("errors.createNewQuestionCodeMessage.400"),
  401: i18n.t("errors.createNewQuestionCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.createNewQuestionCodeMessage.500"),
}

export const DeleteQuestionFromTemplateCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.deleteQuestionFromTemplateCodeMessage.400"),
  401: i18n.t("errors.deleteQuestionFromTemplateCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.deleteQuestionFromTemplateCodeMessage.500"),
}

export const ReorderQuestionsCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.reorderQuestionsCodeMessage.400"),
  401: i18n.t("errors.reorderQuestionsCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.reorderQuestionsCodeMessage.500"),
}

export const UpdateQuestionsCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.updateQuestionsCodeMessage.400"),
  401: i18n.t("errors.updateQuestionsCodeMessage.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.updateQuestionsCodeMessage.500"),
}
