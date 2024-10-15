import { useState } from "react"
import { closestCenter, DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { TabsContent } from "../ui/tabs"
import { NewQuestionForm } from "./NewQuestionForm"
import { SortableQuestionItem } from "./SortableQuestionItem"
import { PageTabsEnum } from "@/interfaces/ui"
import { NewQuestionFormValues, Question } from "@/interfaces/question"
import { useAddQuestionToTemplate } from "@/hooks/template/useTemplate"


interface QuestionsTabProps {
  tabValue: PageTabsEnum
  questions: Question[]
  templateId: number
}

export const QuestionsTab = ({
  tabValue,
  questions,
  templateId,
}: QuestionsTabProps) => {
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const {startAddQuestionToTemplate} = useAddQuestionToTemplate(templateId);

  function onQuestionSubmit(values: NewQuestionFormValues) {
    startAddQuestionToTemplate(templateId, values);
    setIsAddingQuestion(false);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // const { active, over } = event;
    // if (over && active.id !== over.id) {
    //   setQuestions((items) => {
    //     const oldIndex = items.findIndex((item) => item.id === active.id);
    //     const newIndex = items.findIndex((item) => item.id === over.id);
    //     return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
    //       ...item,
    //       sequence: index,
    //     }));
    //   });
    // }
  };

  const handleRemoveQuestion = (id: number) => {
    // const deletedSequence = questions.find((q) => q.id === id)?.sequence;
    // const filteredQuestions = questions.filter((q) => q.id !== id);
    // setQuestions(
    //   filteredQuestions.map((q) => {
    //     if (q.sequence > deletedSequence!) {
    //       return { ...q, sequence: q.sequence - 1 };
    //     }
    //     return q;
    //   })
    // );
  };

  return (
    <TabsContent value={tabValue}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>Questions</CardTitle>
            <CardDescription>Configure the questions for the template</CardDescription>
          </div>
          <Button type="button" onClick={() => setIsAddingQuestion(true)}>
            Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAddingQuestion && (
            <NewQuestionForm
              onSumbit={onQuestionSubmit}
              onCancel={() => setIsAddingQuestion(false)}
            />
          )}
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={questions.map(el => el.id as UniqueIdentifier)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {questions.map((question) => (
                  <SortableQuestionItem
                    key={question.id}
                    question={question}
                    onRemove={() => handleRemoveQuestion(question.id)}
                    onEdit={() => console.log(question.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
