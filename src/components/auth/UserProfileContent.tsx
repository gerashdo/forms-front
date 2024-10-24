import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormDataTable } from "@/components/form/FormDataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TemplateDataTable } from "@/components/template/TemplateDataTable";
import { NewTemplateDialog } from "@/components/template/NewTemplateDialog";
import { useTagsTopics } from "@/hooks/useTagsTopics";
import { useDeleteTemplateMutation } from "@/hooks/template/useTemplate";
import { useDeleteFormMutation } from "@/hooks/form/useFormMutations";
import { useUndo } from "@/hooks/useUndo";
import { getTemplatesQuery } from "@/queries/template";
import { getFormsQuery } from "@/queries/form";
import { User } from "@/interfaces/auth";
import { initialQueryParamsToGetTemplates } from "@/constants/templates/template";
import { initialQueryParamsToGetForms } from "@/constants/form/form";
import { useTranslation } from "react-i18next";


interface UserProfileContent {
  user: User;
}

export const UserProfileContent = ({user}: UserProfileContent) => {
  const {t} = useTranslation();
  const navigation = useNavigate();
  const {tags, topics} = useTagsTopics();
  const {showToast} = useUndo();
  const {startDeleteForm} = useDeleteFormMutation();
  const {startDeleteTemplate} = useDeleteTemplateMutation();
  const [templatesPage, setTemplatesPage] = useState<number>(initialQueryParamsToGetTemplates.page);
  const [formsPage, setFormsPage] = useState<number>(initialQueryParamsToGetForms.page);
  const templatesQuery = useSuspenseQuery(getTemplatesQuery({
    ...initialQueryParamsToGetTemplates,
    page: templatesPage,
    userId: user.id,
  }))
  const formsQuery = useSuspenseQuery(getFormsQuery({
    ...initialQueryParamsToGetForms,
    page: formsPage,
    userId: user.id,
  }));

  const templates = templatesQuery.data.data;
  const forms = formsQuery.data.data;
  const templatesTotalPages = Math.ceil(templatesQuery.data.meta.total / templatesQuery.data.meta.elementsPerPage);
  const formsTotalPages = Math.ceil(formsQuery.data.meta.total / formsQuery.data.meta.elementsPerPage);

  const handleDeleteForm = (formId: number) => {
    showToast(
      () => startDeleteForm(formId),
      {
        title: t('components.userProfileContent.deleteFormToast.title'),
        description: t('components.userProfileContent.deleteFormToast.description'),
      },
      7000,
    )
  }

  const handleDeleteTemplate = (templateId: number) => {
    showToast(
      () => startDeleteTemplate(templateId),
      {
        title: t('components.userProfileContent.deleteTemplateToast.title'),
        description: t('components.userProfileContent.deleteTemplateToast.description'),
      },
      7000,
    )
  }

  return (
    <>
      <Card className="mb-8">
        <CardContent className="flex items-center space-x-4 p-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-3xl font-semibold">
              {user.lastName.charAt(0)}{user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.lastName} {user.name}</h2>
            <p className="text-neutral-500 dark:text-neutral-400">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">
            {t('components.userProfileContent.tabs.templates.title')}
          </TabsTrigger>
          <TabsTrigger value="forms">
            {t('components.userProfileContent.tabs.forms.title')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row justify-between align-middle">
              <div className="space-y-1.5">
                <CardTitle>
                  {t('components.userProfileContent.tabs.templates.title')}
                </CardTitle>
                <CardDescription>
                  {t('components.userProfileContent.tabs.templates.description')}
                </CardDescription>
              </div>
              <NewTemplateDialog
                topics={topics}
                tags={tags}
                onSuccess={(templateId) => navigation({to: `/templates/${templateId}`})}
              />
            </CardHeader>
            <CardContent>
              <TemplateDataTable
                templates={templates}
                currentPage={templatesPage}
                totalPages={templatesTotalPages}
                onNextPage={() => setTemplatesPage((prev) => prev + 1)}
                onPreviousPage={() => setTemplatesPage((prev) => prev - 1)}
                onViewDetails={(templateId) => navigation({to: `/templates/${templateId}`})}
                onDelete={handleDeleteTemplate}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>
                {t('components.userProfileContent.tabs.forms.title')}
              </CardTitle>
              <CardDescription>
                {t('components.userProfileContent.tabs.forms.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormDataTable
                forms={forms}
                currentPage={formsPage}
                totalPages={formsTotalPages}
                onNextPage={() => setFormsPage((prev) => prev + 1)}
                includeActions
                onPreviousPage={() => setFormsPage((prev) => prev - 1)}
                onViewDetails={(formId) => navigation({to: `/forms/${formId}`})}
                onDelete={handleDeleteForm}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
