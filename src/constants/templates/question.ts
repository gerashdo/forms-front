import * as z from "zod";
import { QuestionTypes } from "@/interfaces/question";
import i18n from "@/i18n";


export const newQuestionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visible: z.boolean().default(true),
  type: z.enum([QuestionTypes.MULTIPLE, QuestionTypes.BOOLEAN, QuestionTypes.TEXT, QuestionTypes.INTEGER]),
})

export const questionTypeLabels = {
  [QuestionTypes.MULTIPLE]: i18n.t("constants.questionTypeLabels.multiple"),
  [QuestionTypes.BOOLEAN]: i18n.t("constants.questionTypeLabels.boolean"),
  [QuestionTypes.TEXT]: i18n.t("constants.questionTypeLabels.text"),
  [QuestionTypes.INTEGER]: i18n.t("constants.questionTypeLabels.integer"),
} as const;
