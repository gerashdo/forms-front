import { ErrorCode } from "./errorsRequest";
import { QuestionTypes } from "./question";


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
  400: 'Invalid data, please check the data for the answer edition',
  422: 'You are trying to set values in the wrong type of question',
  500: 'There was an error processing your request. Please try again later',
}
