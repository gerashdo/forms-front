import { useState, HTMLAttributes, useRef } from 'react';
import { closestCenter, DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewQuestionForm } from "@/components/template/NewQuestionForm";
import { SortableQuestionItem } from "@/components/template/SortableQuestionItem";
import { useAddQuestionToTemplate, useDeleteQuestionFromTemplate, useReorderQuestionsMutation } from "@/hooks/template/useTemplate";
import { useUpdateQuestionMutation } from '@/hooks/template/useQuestionQueries';
import { NewQuestionFormValues, Question } from "@/interfaces/question";


interface QuestionsTabProps extends HTMLAttributes<HTMLDivElement> {
  questions: Question[]
  templateId: number
}

export const QuestionsTab = ({
  questions,
  templateId,
  className,
  ...props
}: QuestionsTabProps) => {
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const {startAddQuestionToTemplate} = useAddQuestionToTemplate(templateId);
  const {startDeleteQuestionFromTemplate} = useDeleteQuestionFromTemplate(templateId);
  const {startReorderQuestions} = useReorderQuestionsMutation(templateId);
  const {startUpdateQuestion} = useUpdateQuestionMutation(templateId.toString());
  const [isRemovingQuestion, setIsRemovingQuestion] = useState<boolean>(false);
  const [questionIdToRemove, setQuestionIdToRemove] = useState<number | null>(null);
  const isEditing = useRef<boolean>(false);
  const questionToEdit = useRef<number | null>(null);

  const [defaultQuestionValues, setDefaultQuestionValues] = useState<NewQuestionFormValues | undefined>(undefined);

  function onQuestionSubmit(values: NewQuestionFormValues) {
    if (isEditing.current && questionToEdit.current) {
      startUpdateQuestion(questionToEdit.current, values);
    } else {
      startAddQuestionToTemplate(templateId, values);
    }
    resetIndicatorValues();
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

  const resetIndicatorValues = () => {
    isEditing.current = false;
    questionToEdit.current = null;
    setDefaultQuestionValues(undefined);
    setIsAddingQuestion(false);
  }

  const onEditQuestion = (question: Question) => {
    isEditing.current = true;
    questionToEdit.current = question.id;
    setDefaultQuestionValues({
      title: question.title,
      description: question.description,
      type: question.type,
      visible: question.visible,
    });
    setIsAddingQuestion(true);
  };

  const onRemove = (id: number) => {
    setIsRemovingQuestion(true);
    setQuestionIdToRemove(id);
    resetIndicatorValues();
  };

  const onCancelQuestionForm = () => {
    resetIndicatorValues();
  }

  const handleDeleteQuestion = () => {
    if (!questionIdToRemove) return;
    startDeleteQuestionFromTemplate(templateId, questionIdToRemove);
    setIsRemovingQuestion(false);
    setQuestionIdToRemove(null);
  }

  return (
    <div className={className} {...props}>
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
              onCancel={onCancelQuestionForm}
              defaultValues={defaultQuestionValues}
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
                    onEdit={() => onEditQuestion(question)}
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
    </div>
  )
}
