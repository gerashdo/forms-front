import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { AnswerItem } from "@/components/answer/AnswerItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthState } from "@/state/auth";
import { useUpdateAnswerMutation } from "@/hooks/answer/useAnswerMutations";
import { getAnswersQuery } from "@/queries/answer";
import { getFormQuery } from "@/queries/form";
import { formatDateTime } from "@/helpers/dateFormat";
import { UserRoles } from "@/interfaces/auth";


const route = getRouteApi('/_layout/forms/$formId');

export const FormPage = () => {
  const {user} = useRecoilValue(AuthState);
  const {formId} = route.useParams();
  const {startUpdateAnswer} = useUpdateAnswerMutation(Number(formId));
  const formQuery = useSuspenseQuery(getFormQuery(Number(formId)));
  const answersQuery = useSuspenseQuery(getAnswersQuery({formId: Number(formId)}));
  const form = formQuery.data.data;
  const answers = answersQuery.data.data;

  const onSubmitEditAnswer = (answerId: number, value: string | number | boolean) => {
    startUpdateAnswer(answerId, value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{form.Template.title}</CardTitle>
        <CardDescription>
          Submitted by {form.User.lastName} {form.User.name} ({form.User.email}) on {formatDateTime(form.submissionDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        {answers.map((answer, index) => (
          <AnswerItem
            key={answer.id}
            answer={answer}
            index={index + 1}
            allowEdition={user?.id === form.userId || user?.role === UserRoles.ADMIN}
            onSubmitEditAnswer={(value) => onSubmitEditAnswer(answer.id, value)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default FormPage;
