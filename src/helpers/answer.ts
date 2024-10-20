import { Answer } from "@/interfaces/answer";
import { QuestionTypes } from "@/interfaces/question";


export const getAnswerDefaultValue = (answer: Answer) => {
  switch (answer.Question.type) {
    case QuestionTypes.TEXT:
      return answer.textValue;
    case QuestionTypes.MULTIPLE:
      return answer.multipleTextLineValue;
    case QuestionTypes.INTEGER:
      return answer.numberValue;
    case QuestionTypes.BOOLEAN:
      return answer.booleanValue;
    default:
      return "";
  }
}
