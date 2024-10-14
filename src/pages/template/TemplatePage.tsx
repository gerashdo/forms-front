import { useState } from "react"
import { getRouteApi } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { closestCenter, DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { NewQuestionForm } from "@/components/template/NewQuestionForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplateTab } from "@/components/template/TemplateTab"
import { SortableQuestionItem } from "@/components/template/SortableQuestionItem"
import { getTagsQuery, getTemplateByIdQuery, getTopicsQuery } from "@/queries/template"
import { questionsFake } from "@/data/question"
import { template1 } from "@/data/template"
import { NewQuestionFormValues, Question } from "@/interfaces/question"


const route = getRouteApi('/_layout/templates/$templateId')

export enum PageTabsEnum {
  SETTINGS = 'settings',
  QUESTIONS = 'questions',
  RESULTS = 'results',
  AGGREGATION = 'aggregations'
}

const PageTabs = {
  [PageTabsEnum.SETTINGS]: 'Settings',
  [PageTabsEnum.QUESTIONS]: 'Questions',
  [PageTabsEnum.RESULTS]: 'Results',
  [PageTabsEnum.AGGREGATION]: 'Aggregations'
} as const;

export const TemplatePage = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)
  const topicsQuery = useSuspenseQuery(getTopicsQuery)
  const tags = tagsQuery.data.data.data
  const topics = topicsQuery.data.data.data
  const {templateId} = route.useParams()
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId))
  const template = templateQuery.data.data.data
  const [activeTab, setActiveTab] = useState<PageTabsEnum>(PageTabsEnum.QUESTIONS)


  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>(questionsFake);

  function onQuestionSubmit(values: NewQuestionFormValues) {
    setQuestions([
      ...questions,
      { ...values, id: questions.length + 1, sequence: questions.length, templateId: template1.id, description: values.description || '' },
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

  const handleRemoveQuestion = (id: number) => {
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
  };


  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">{template.title}</h1>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PageTabsEnum)}>
        <TabsList className="grid w-full grid-cols-4">
          {Object.values(PageTabsEnum).map((value) => (
            <TabsTrigger key={value} value={value}>
              {PageTabs[value]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TemplateTab tabValue={PageTabsEnum.SETTINGS} template={template} topics={topics} tags={tags} />

        <TabsContent value={PageTabsEnum.QUESTIONS}>
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
      </Tabs>
    </>
  )
}
