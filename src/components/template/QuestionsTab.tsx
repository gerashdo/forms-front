import { useState } from "react"
import { closestCenter, DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { NewQuestionForm } from "./NewQuestionForm"
import { SortableQuestionItem } from "./SortableQuestionItem"
import { useAddQuestionToTemplate, useDeleteQuestionFromTemplate, useReorderQuestionsMutation } from "@/hooks/template/useTemplate"
import { PageTabsEnum } from "@/interfaces/ui"
import { NewQuestionFormValues, Question } from "@/interfaces/question"


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
  const {startDeleteQuestionFromTemplate} = useDeleteQuestionFromTemplate(templateId);
  const {startReorderQuestions} = useReorderQuestionsMutation(templateId);
  const [isRemovingQuestion, setIsRemovingQuestion] = useState<boolean>(false);
  const [questionIdToRemove, setQuestionIdToRemove] = useState<number | null>(null);

  function onQuestionSubmit(values: NewQuestionFormValues) {
    startAddQuestionToTemplate(templateId, values);
    setIsAddingQuestion(false);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((item) => item.id === active.id);
      const newIndex = questions.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(questions, oldIndex, newIndex).map((item) => item.id);
      startReorderQuestions(newOrder);
    }
  };

  const onRemove = (id: number) => {
    setIsRemovingQuestion(true);
    setQuestionIdToRemove(id);
  };

  const handleDeleteQuestion = () => {
    if (!questionIdToRemove) return;
    startDeleteQuestionFromTemplate(templateId, questionIdToRemove);
    setIsRemovingQuestion(false);
    setQuestionIdToRemove(null);
  }
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
                    onRemove={() => onRemove(question.id)}
                    onEdit={() => console.log(question.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
      <Dialog open={isRemovingQuestion} onOpenChange={setIsRemovingQuestion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure...
            </DialogTitle>
            <DialogDescription>
              you want to remove this question?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsRemovingQuestion(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteQuestion}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  )
}
