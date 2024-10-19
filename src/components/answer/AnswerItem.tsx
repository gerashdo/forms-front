import { useState } from "react";
import { Button } from "../ui/button";
import { isDateQuestion, isEmailQuestion } from "@/helpers/forms";
import { formatDateTime } from "@/helpers/dateFormat";
import { QuestionTypes } from "@/interfaces/question";
import { Answer } from "@/interfaces/answer";


interface AnswerItemProps {
  answer: Answer;
}

export const AnswerItem = ({answer}: AnswerItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const renderAnswer = (answer: Answer) => {
    switch (answer.Question.type) {
      case QuestionTypes.TEXT:
        if (isDateQuestion(answer.Question.type, answer.Question.title)) {
          return <p>{formatDateTime(answer.textValue!)}</p>
        }
        return <p>{answer.textValue}</p>
      case QuestionTypes.INTEGER:
        return <p>{answer.numberValue}</p>
      case QuestionTypes.BOOLEAN:
        return <p>{answer.booleanValue ? "Yes" : "No"}</p>
      case QuestionTypes.MULTIPLE:
        return <p>{answer.multipleTextLineValue}</p>
      default:
        return null
    }
  }

  return (
    <div className="mb-4 p-4 border rounded">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{answer.Question.title}</h3>
        {!isDateQuestion(answer.Question.type, answer.Question.title) && !isEmailQuestion(answer.Question.type, answer.Question.title) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      {renderAnswer(answer)}
      {/* <EditQuestionDialog
        question={question}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onUpdate={onUpdate}
      /> */}
    </div>
  );
}