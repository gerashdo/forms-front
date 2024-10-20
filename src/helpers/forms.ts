import * as z from "zod";
import { Question, QuestionTypes } from "@/interfaces/question";
import { User } from "@/interfaces/auth";
import { PostFormRequest } from "@/interfaces/form";


export const isEmailQuestion = (questionType: QuestionTypes, questionTitle: string): boolean => {
  return questionType === QuestionTypes.TEXT && questionTitle.toLowerCase().includes('email');
}

export const isDateQuestion = (questionType: QuestionTypes, questionTitle: string): boolean => {
  return questionType === QuestionTypes.TEXT && questionTitle.toLowerCase().includes('date');
}

export const getQuestionZodType = (type: QuestionTypes) => {
  switch (type) {
    case QuestionTypes.TEXT:
      return z.string().min(1, "This field is required");
    case QuestionTypes.MULTIPLE:
      return z.string().min(1, "This field is required");
    case QuestionTypes.INTEGER:
      return z.coerce.number({message: "The value should be a number"}).min(0, "Must be greater or equals to 0");
    case QuestionTypes.BOOLEAN:
      return z.boolean();
    default:
      return z.string().min(1, "This field is required");
  }
}

export const generateFormSchemaFromQuestions = (questions: Question[]) => {
  const schemaFields: Record<number, z.ZodString | z.ZodBoolean | z.ZodNumber> = {}; // Ensure the object type allows numeric keys

  questions.forEach(question => {
    schemaFields[question.id] = getQuestionZodType(question.type);
  });
  return z.object(schemaFields);
};

export const getDefaultValue = (question: Question, user: User): string | number | boolean | undefined  => {
  switch (question.type) {
    case QuestionTypes.TEXT:
      if (isEmailQuestion(question.type, question.title) && user) return user.email;
      if (isDateQuestion(question.type, question.title)) return new Date().toISOString();
      return "";
    case QuestionTypes.MULTIPLE:
      return "";
    case QuestionTypes.INTEGER:
      return -1;
    case QuestionTypes.BOOLEAN:
      return false;
    default:
      return undefined;
  }
}

export const createPostFormRequest = (
  userId: number,
  templateId: number,
  answers: Record<number, string | number | boolean>,
  questions: Question[],
): PostFormRequest => {
  const answersArray = Object.entries(answers).map(([questionId, value]) => {
    const questionType = questions.find(question => question.id === parseInt(questionId))?.type || QuestionTypes.TEXT;
    return {
      questionId: parseInt(questionId),
      value,
      type: questionType,
    }
  });

  return {
    userId,
    templateId,
    answers: answersArray,
  }
}
