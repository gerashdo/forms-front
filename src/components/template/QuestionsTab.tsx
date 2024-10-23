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
import { useTranslation } from 'react-i18next';


interface QuestionsTabProps extends HTMLAttributes<HTMLDivElement> {
  questions: Question[]
  templateId: number
  allowEdition?: boolean
}

export const QuestionsTab = ({
  questions,
  templateId,
  allowEdition,
  className,
  ...props
}: QuestionsTabProps) => {
  const {t} = useTranslation();
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
            <CardTitle>{t('components.questionsTab.title')}</CardTitle>
            <CardDescription>
            {allowEdition ?
              t('components.questionsTab.description.edit') :
              t('components.questionsTab.description.view')}
            </CardDescription>
          </div>
          {allowEdition && (
            <Button type="button" onClick={() => setIsAddingQuestion(true)}>
              {t('components.questionsTab.addQuestion')}
            </Button>
          )}
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
                    allowEdition={allowEdition}
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
              {t('components.questionsTab.sure')}
            </DialogTitle>
            <DialogDescription>
              {t('components.questionsTab.deleteDescription')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsRemovingQuestion(false)}>
              {t('components.questionsTab.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDeleteQuestion}>
              {t('components.questionsTab.remove')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
