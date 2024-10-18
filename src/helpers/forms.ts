import * as z from "zod";
import { Question, QuestionTypes } from "@/interfaces/question";
import { User } from "@/interfaces/auth";
import { PostFormRequest } from "@/interfaces/form";


export const isEmailQuestion = (question: Question): boolean => {
  return question.type === QuestionTypes.TEXT && question.title.toLowerCase().includes('email');
}

export const isDateQuestion = (question: Question): boolean => {
  return question.type === QuestionTypes.TEXT && question.title.toLowerCase().includes('date');
}

export const generateFormSchemaFromQuestions = (questions: Question[]) => {
  const schemaFields: Record<number, z.ZodString | z.ZodBoolean | z.ZodNumber> = {}; // Ensure the object type allows numeric keys

  questions.forEach(question => {
    switch (question.type) {
      case QuestionTypes.TEXT:
        schemaFields[question.id] = z.string().min(1, "This field is required");
        break;
      case QuestionTypes.MULTIPLE:
        schemaFields[question.id] = z.string().min(1, "This field is required");
        break;
      case QuestionTypes.INTEGER:
        schemaFields[question.id] = z.coerce.number({message: "The value should be a number"}).min(0, "Must be greater or equals to 0");
        break;
      case QuestionTypes.BOOLEAN:
        schemaFields[question.id] = z.boolean();
        break;
      default:
        break;
    }
  });
  return z.object(schemaFields);
};

export const getDefaultValue = (question: Question, user: User): string | number | boolean | undefined  => {
  switch (question.type) {
    case QuestionTypes.TEXT:
      if (isEmailQuestion(question) && user) return user.email;
      if (isDateQuestion(question)) return new Date().toISOString();
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
