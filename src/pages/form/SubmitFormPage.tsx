import * as z from "zod";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Navigate, useRouter } from "@tanstack/react-router";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthState } from "@/state/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getQuestionsByTemplateIdQuery } from "@/queries/question";
import { getTemplateByIdQuery } from "@/queries/template";
import { Question, QuestionTypes } from "@/interfaces/question";
import { generateFormSchemaFromQuestions, getDefaultValue, isDateQuestion, isEmailQuestion } from "@/helpers/forms";


const route = getRouteApi('/_layout/templates/$templateId/forms/submit');

const SubmitFormPage = () => {
  const {templateId} = route.useParams();
  const {user} = useRecoilValue(AuthState);
  const {history} = useRouter();
  const questionsQuery = useSuspenseQuery(getQuestionsByTemplateIdQuery(templateId));
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId));
  const [isSubmitting] = useState(false);
  const questions = questionsQuery.data.data;
  const template = templateQuery.data.data;

  const formSchema = generateFormSchemaFromQuestions(questions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(questions.map(question =>
      [question.id.toString(), getDefaultValue(question, user!)]
    )),
  });

  if (questions.length === 0) {
    return <Navigate to={`/templates/${template.id}`} />;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitting form...");
    console.log({values});
  }

  const onCancel = () => {
    history.back();
  }

  const renderField = (question: Question, field: ControllerRenderProps<{
    [x: number]: string | number | boolean;
  }>) => {
    switch (question.type) {
      case QuestionTypes.TEXT:
        return <Input {...field} disabled={isDateQuestion(question) || isEmailQuestion(question)} />;
      case QuestionTypes.MULTIPLE:
        return <Textarea {...field} />;
      case QuestionTypes.INTEGER:
        return <Input type="number" {...field} />;
      case QuestionTypes.BOOLEAN:
        return (
          <div className="flex items-center space-x-2">
            <FormLabel>Yes</FormLabel>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {questions.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id.toString() as never}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{index+1} - {question.title}</FormLabel>
                    <FormControl>
                      {renderField(question, field)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end gap-2 align-middle">
              <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SubmitFormPage;
