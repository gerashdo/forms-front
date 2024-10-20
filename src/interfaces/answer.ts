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
