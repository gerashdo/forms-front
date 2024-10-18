import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Navigate, useRouter } from "@tanstack/react-router";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormForm } from "@/components/form/FormForm";
import { usePostFormMutation } from "@/hooks/form/useFormMutations";
import { getQuestionsByTemplateIdQuery } from "@/queries/question";
import { getTemplateByIdQuery } from "@/queries/template";
import { createPostFormRequest, getDefaultValue } from "@/helpers/forms";


const route = getRouteApi('/_layout/templates/$templateId/forms/submit');

const SubmitFormPage = () => {
  const {templateId} = route.useParams();
  const {user} = useRecoilValue(AuthState);
  const {history} = useRouter();
  const questionsQuery = useSuspenseQuery(getQuestionsByTemplateIdQuery(templateId));
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId));
  const {startSubmitForm, isLoading, success} = usePostFormMutation();
  const questions = questionsQuery.data.data;
  const template = templateQuery.data.data;

  useEffect(() => {
    if (success) {
      history.back();
    }
  }, [success, history]);

  if (questions.length === 0 || !user) {
    return <Navigate to={`/templates/${template.id}`} />;
  }

  const onSubmit = (values: Record<number, string | number | boolean>) => {
    if (!user) return
    const valuesToSend = createPostFormRequest(user.id, template.id, values, questions);
    startSubmitForm(valuesToSend);
  }

  const onCancel = () => {
    history.back();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <FormForm
          questions={questions}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          defaultValues={
            Object.fromEntries(
              questions.map(question =>[question.id, getDefaultValue(question, user!)]
            )) as Record<number, string | number | boolean>
          }
        />
      </CardContent>
    </Card>
  )
}

export default SubmitFormPage;
