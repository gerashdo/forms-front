import { ErrorCode } from "./errorsRequest";
import { QuestionTypes } from "./question";
import i18n from "@/i18n";


export interface GetAnswersResponse {
  ok:   boolean;
  data: Answer[];
}

export interface Answer {
  id:                    number;
  textValue:             string  | null;
  numberValue:           number  | null;
  booleanValue:          boolean | null;
  multipleTextLineValue: string  | null;
  questionId:            number;
  Question:              GetAnswersResponseQuestion;
}

export interface GetAnswersResponseQuestion {
  title:    string;
  type:     QuestionTypes;
  sequence: number;
}

export interface GetAnswersParams {
  formId: number;
}

export interface PatchAnswerResponse {
  ok:   boolean;
  data: Answer;
}

export const PatchAnswerCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.patchAnswerCodeMessage.400"),
  401: i18n.t("errors.patchAnswerCodeMessage.401"),
  403: i18n.t("errors.patchAnswerCodeMessage.403"),
  404: i18n.t("errors.patchAnswerCodeMessage.404"),
  422: i18n.t("errors.patchAnswerCodeMessage.422"),
  500: i18n.t("errors.patchAnswerCodeMessage.500"),
}
