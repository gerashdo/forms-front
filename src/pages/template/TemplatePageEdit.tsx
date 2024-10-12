import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, UniqueIdentifier, closestCenter } from "@dnd-kit/core";
import { NewTemplateForm } from "@/components/template/NewTemplateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewQuestionForm } from "@/components/template/NewQuestionForm";
import { SortableItem } from "@/components/template/SortableItem";
import { getTemplateByIdQuery } from "@/queries/template";
import { NewQuestionFormValues, QuestionTypes } from "@/interfaces/question";


const route = getRouteApi("/_layout/templates/edit/$templateId");

export const TemplatePageEdit = () => {
  const { templateId } = route.useParams();
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId));
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  console.log({ data: templateQuery.data.data.data });

  const [questions, setQuestions] = useState<NewQuestionFormValues[]>([
    {
      id: "1",
      title: "Name",
      description: "",
      visible: true,
      type: QuestionTypes.TEXT,
      sequence: 0,
    },
    {
      id: "2",
      title: "Email",
      description: "",
      visible: true,
      type: QuestionTypes.TEXT,
      sequence: 1,
    },
    {
      id: "3",
      title: "Age",
      description: "The age for the user",
      visible: true,
      type: QuestionTypes.INTEGER,
      sequence: 2,
    },
  ]);

  function onQuestionSubmit(values: NewQuestionFormValues) {
    setQuestions([
      ...questions,
      { ...values, id: Date.now().toString(), sequence: questions.length },
    ]);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          sequence: index,
        }));
      });
    }
  };

  const handleRemoveQuestion = (id: string) => {
    const deletedSequence = questions.find((q) => q.id === id)?.sequence;
    const filteredQuestions = questions.filter((q) => q.id !== id);
    setQuestions(
      filteredQuestions.map((q) => {
        if (q.sequence > deletedSequence!) {
          return { ...q, sequence: q.sequence - 1 };
        }
        return q;
      })
    );
  }

  useEffect(() => {
    console.log("Questions:", questions);
  }, [questions])

  return (
    <div className="flex gap-6 w-full">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
          </CardHeader>
          <CardContent>
            <NewTemplateForm topics={[]} tags={[]} />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col w-full gap-6 ">
        {isAddingQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
            </CardHeader>
            <CardContent>
              <NewQuestionForm
                defaultValues={{
                  id: "",
                  title: "",
                  description: "",
                  visible: true,
                  type: QuestionTypes.TEXT,
                  sequence: questions.length,
                }}
                onSumbit={onQuestionSubmit}
                onCancel={() => setIsAddingQuestion(false)}
              />
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Questions</CardTitle>
            <Button type="button" onClick={() => setIsAddingQuestion(true)}>
              Add Question
            </Button>
          </CardHeader>
          <CardContent>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={questions.map(el => el.id as UniqueIdentifier)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <SortableItem
                      key={question.id}
                      question={question}
                      onRemove={() => handleRemoveQuestion(question.id!)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

