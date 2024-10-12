import * as z from "zod"
import { QuestionTypes } from "@/interfaces/question"


export const newQuestionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visible: z.boolean().default(true),
  type: z.enum([QuestionTypes.MULTIPLE, QuestionTypes.BOOLEAN, QuestionTypes.TEXT, QuestionTypes.INTEGER]),
  sequence: z.number(),
})

export const questionTypeLabels = {
  [QuestionTypes.MULTIPLE]: 'Multiple Choice',
  [QuestionTypes.BOOLEAN]: 'True/False',
  [QuestionTypes.TEXT]: 'Text',
  [QuestionTypes.INTEGER]: 'Integer',
} as const;
