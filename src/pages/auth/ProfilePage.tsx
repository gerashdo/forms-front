import { useState } from "react";
import { useRecoilValue } from "recoil";
import { redirect } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthState } from "@/state/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTemplatesQuery } from "@/queries/template";
import { ALLOWED_TEMPLATE_ORDER_BY, ALLOWED_TEMPLATE_ORDER_BY_FIELDS } from "@/constants/templates/template";
import { TemplateDataTable } from "@/components/template/TemplateDataTable";


const ProfilePage = () => {
  const authState = useRecoilValue(AuthState);
  const {user} = authState;
  const [templatesPage, setTemplatesPage] = useState<number>(1);
  const templatesQuery = useSuspenseQuery(getTemplatesQuery({
    limit: 10,
    page: templatesPage,
    orderBy: ALLOWED_TEMPLATE_ORDER_BY_FIELDS.createdAt,
    order: ALLOWED_TEMPLATE_ORDER_BY.DESC,
    userId: user?.id,
  }))
  if (!user) return redirect({to: '/auth', search: {redirect: '/profile'}});
  const templates = templatesQuery.data.data;
  const templatesTotalPages = Math.ceil(templatesQuery.data.meta.total / templatesQuery.data.meta.elementsPerPage);

  const handleTemplatesNextPage = () => {
    setTemplatesPage((prev) => prev + 1);
  }
  const handleTemplatesPreviousPage = () => {
    setTemplatesPage((prev) => prev - 1);
  }

  return (
    <div>
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
            <CardHeader>
              <CardTitle>My Templates</CardTitle>
              <CardDescription>Manage your created templates here</CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateDataTable
                templates={templates}
                currentPage={templatesPage}
                totalPages={templatesTotalPages}
                onNextPage={handleTemplatesNextPage}
                onPreviousPage={handleTemplatesPreviousPage}
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
