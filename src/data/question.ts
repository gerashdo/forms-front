import { Question, QuestionTypes } from "@/interfaces/question";
import { template1 } from "./template";

const question1: Question = {
  id: 1,
  title: "Whats your name?",
  description: "Question to know the users name",
  visible: true,
  type: QuestionTypes.TEXT,
  sequence: 0,
  templateId: template1.id,
}

const question2: Question = {
  id: 2,
  title: "Introduce your email",
  description: "Question to know the users email",
  visible: true,
  type: QuestionTypes.TEXT,
  sequence: 1,
  templateId: template1.id,

}

const question3: Question = {
  id: 3,
  title: "Whats your age?",
  description: "Question to know the users age",
  visible: true,
  type: QuestionTypes.INTEGER,
  sequence: 2,
  templateId: template1.id,
}

export const questionsFake = [question1, question2, question3];
