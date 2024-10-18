import * as z from "zod";
import { Question, QuestionTypes } from "@/interfaces/question";
import { User } from "@/interfaces/auth";


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
        schemaFields[question.id] = z.coerce.number({message: "The value should be a number"}).min(0, "Must be a positive number");
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

export const getDefaultValue = (question: Question, user: User) => {
  switch (question.type) {
    case QuestionTypes.TEXT:
      if (isEmailQuestion(question) && user) return user.email;
      if (isDateQuestion(question)) return new Date().toISOString();
      return "";
    case QuestionTypes.MULTIPLE:
      return "";
    case QuestionTypes.INTEGER:
      return undefined;
    case QuestionTypes.BOOLEAN:
      return false;
    default:
      return undefined;
  }
}
