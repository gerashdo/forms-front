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
import { useDeleteFormMutation } from "@/hooks/form/useFormMutations";
import { getTemplatesQuery } from "@/queries/template";
import { getFormsQuery } from "@/queries/form";
import { User } from "@/interfaces/auth";
import { initialQueryParamsToGetTemplates } from "@/constants/templates/template";
import { initialQueryParamsToGetForms } from "@/constants/form/form";


interface UserProfileContent {
  user: User;
}

export const UserProfileContent = ({user}: UserProfileContent) => {
  const navigation = useNavigate();
  const {tags, topics} = useTagsTopics();
  const {startDeleteForm} = useDeleteFormMutation();
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
    startDeleteForm(formId);
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
          <TabsTrigger value="templates">My Templates</TabsTrigger>
          <TabsTrigger value="forms">My Filled Forms</TabsTrigger>
        </TabsList>
        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row justify-between align-middle">
              <div>
                <CardTitle>My Templates</CardTitle>
                <CardDescription>Manage your created templates here</CardDescription>
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
                onDelete={(templateId) => console.log('Delete template', templateId)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Filled Forms</CardTitle>
              <CardDescription>View your filled forms here</CardDescription>
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
