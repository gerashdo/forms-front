import * as z from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getQuestionZodType } from "@/helpers/forms";
import { getAnswerDefaultValue } from "@/helpers/answer";
import { Answer } from "@/interfaces/answer";
import { QuestionTypes } from "@/interfaces/question";
import { useTranslation } from "react-i18next";


interface AnswerFormProps {
  answer: Answer
  onSubmit: (newValue: string | number | boolean) => void
  onCancel: () => void
  includeLable?: boolean
}

export const AnswerForm = ({
  answer,
  onSubmit,
  onCancel,
  includeLable = false,
}: AnswerFormProps) => {
  const {t} = useTranslation();

  const renderField = (
    questionType: QuestionTypes,
    field: ControllerRenderProps<{
      answer: string | number | boolean;
    }>
  ) => {
    switch (questionType) {
      case QuestionTypes.TEXT:
        return <Input {...field} value={field.value as string}/>;
      case QuestionTypes.MULTIPLE:
        return <Textarea {...field} value={field.value as string}/>;
      case QuestionTypes.INTEGER:
        return <Input type="number" {...field} value={field.value as number}/>;
      case QuestionTypes.BOOLEAN:
        return (
          <div className="flex items-center space-x-2">
            <FormLabel>{t("components.answerForm.yes")}</FormLabel>
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </div>
        );
      default:
        return null;
    }
  }

  const formSchema = z.object({
    answer: getQuestionZodType(answer.Question.type)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: getAnswerDefaultValue(answer) || ""
    }
  })

  const handleFormSubmit = (values: {answer: string | number | boolean}) => {
    onSubmit(values.answer)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="answer"
          render={({field}) => (
            <FormItem>
              {includeLable && <FormLabel>{answer.Question.title}</FormLabel>}
              <FormControl>
                {renderField(answer.Question.type, field)}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 align-middle">
          <Button variant="ghost" onClick={onCancel}>
            {t("components.answerForm.cancel")}
          </Button>
          <Button type="submit">
            {t("components.answerForm.save")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
