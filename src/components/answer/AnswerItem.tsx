import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerForm } from "@/components/answer/AnswerForm";
import { isDateQuestion, isEmailQuestion } from "@/helpers/forms";
import { formatDateTime } from "@/helpers/dateFormat";
import { QuestionTypes } from "@/interfaces/question";
import { Answer } from "@/interfaces/answer";
import { useTranslation } from "react-i18next";


interface AnswerItemProps {
  answer: Answer;
  index: number;
  allowEdition?: boolean;
  onSubmitEditAnswer?: (value: string | number | boolean) => void;
}

export const AnswerItem = ({answer, index, allowEdition, onSubmitEditAnswer}: AnswerItemProps) => {
  const {t} = useTranslation();
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
        return <p>{answer.booleanValue ?
          t("components.answerItem.yes"):
          t("components.answerItem.no")}
        </p>
      case QuestionTypes.MULTIPLE:
        return <p>{answer.multipleTextLineValue}</p>
      default:
        return null
    }
  }

  const handleStartEdit = () => {
    if (!allowEdition) return;
    setIsEditing(true);
  }

  const handleOnCancelEdit = () => {
    setIsEditing(false);
  }

  const handleSumbit = (value: string | number | boolean) => {
    if (onSubmitEditAnswer) onSubmitEditAnswer(value);
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">
          {index} - {answer.Question.title}
        </CardTitle>
        {!isDateQuestion(answer.Question.type, answer.Question.title) &&
          !isEmailQuestion(answer.Question.type, answer.Question.title) &&
          allowEdition &&
          !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStartEdit}
          >
            {t("components.answerItem.edit")}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <AnswerForm
            answer={answer}
            onSubmit={handleSumbit}
            onCancel={handleOnCancelEdit}
          />
        ): (
          renderAnswer(answer)
        )}
      </CardContent>
    </Card>
  );
}