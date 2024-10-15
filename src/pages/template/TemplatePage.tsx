import { useState } from "react"
import { getRouteApi } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplateTab } from "@/components/template/TemplateTab"
import { QuestionsTab } from "@/components/template/QuestionsTab"
import { getTagsQuery, getTemplateByIdQuery, getTopicsQuery } from "@/queries/template"
import { PageTabsEnum } from "@/interfaces/ui"
import { getQuestionsByTemplateIdQuery } from "@/queries/question"


const route = getRouteApi('/_layout/templates/$templateId')

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
  const questionsQuery = useSuspenseQuery(getQuestionsByTemplateIdQuery(templateId))
  const questions = questionsQuery.data.data

  const [activeTab, setActiveTab] = useState<PageTabsEnum>(PageTabsEnum.QUESTIONS)

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

        <QuestionsTab tabValue={PageTabsEnum.QUESTIONS} questions={questions} templateId={Number(templateId)}/>
      </Tabs>
    </>
  )
}
