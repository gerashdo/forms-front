import { useState } from "react";
import { useRecoilValue } from "recoil";
import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateTab } from "@/components/template/TemplateTab";
import { TemplatePageResultsTab } from "@/components/form/TemplatePageResultsTab";
import { QuestionsTab } from "@/components/template/QuestionsTab";
import { AuthState } from "@/state/auth";
import { getTagsQuery, getTemplateByIdQuery, getTopicsQuery } from "@/queries/template";
import { getQuestionsByTemplateIdQuery } from "@/queries/question";
import { isAuthenticated } from "@/helpers/auth";
import { PageTabsEnum } from "@/interfaces/ui";
import { UserRoles } from "@/interfaces/auth";


const route = getRouteApi('/_layout/templates/$templateId')

const PageTabs = {
  [PageTabsEnum.SETTINGS]: 'Settings',
  [PageTabsEnum.RESULTS]: 'Results',
  [PageTabsEnum.AGGREGATION]: 'Aggregations'
} as const;

export const TemplatePage = () => {
  const authState = useRecoilValue(AuthState);
  const user = authState.user;
  const tagsQuery = useSuspenseQuery(getTagsQuery);
  const topicsQuery = useSuspenseQuery(getTopicsQuery);
  const tags = tagsQuery.data.data.data;
  const topics = topicsQuery.data.data.data;
  const {templateId} = route.useParams();
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId));
  const template = templateQuery.data.data;
  const questionsQuery = useSuspenseQuery(getQuestionsByTemplateIdQuery(templateId));
  const questions = questionsQuery.data.data;
  const [activeTab, setActiveTab] = useState<PageTabsEnum>(PageTabsEnum.SETTINGS);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-neutral-950 dark:text-neutral-50">{template.title}</h1>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PageTabsEnum)}>
        <TabsList className="grid w-full grid-cols-3">
          {Object.values(PageTabsEnum).map((value) => (
            <TabsTrigger key={value} value={value}>
              {PageTabs[value]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={PageTabsEnum.SETTINGS} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <QuestionsTab
            questions={questions}
            templateId={Number(templateId)}
            className="col-span-1 lg:col-span-2"
            allowEdition={(user?.id === template.User.id) || user?.role === UserRoles.ADMIN}
          />
          <TemplateTab
            template={template}
            topics={topics}
            tags={tags}
            className="col-span-1 lg:col-span-3"
            allowEdition={(user?.id === template.User.id) || user?.role === UserRoles.ADMIN}
            allowAnswer={isAuthenticated(authState)}
          />
        </TabsContent>
        <TabsContent value={PageTabsEnum.RESULTS}>
          <TemplatePageResultsTab
            templateId={templateId}
            allowEdition={(user?.id === template.User.id) || user?.role === UserRoles.ADMIN}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
