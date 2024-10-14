import * as z from "zod";
import { newQuestionSchema } from "@/constants/templates/question";


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
