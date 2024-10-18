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

export const PostFormCodeMessage: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid data, please check the data for the form submission',
  422: 'The form submission could not be processed, please check that all the questions are answered, or if it has already been submitted by you',
  500: 'There was an error processing your request. Please try again later',
}
