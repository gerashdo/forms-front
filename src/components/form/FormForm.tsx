import * as z from "zod";
import { generateFormSchemaFromQuestions, isDateQuestion, isEmailQuestion } from "@/helpers/forms";
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question, QuestionTypes } from "@/interfaces/question";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";


interface FormFormProps {
  questions: Question[]
  onSubmit: (values: Record<number, string | number | boolean>) => void
  onCancel: () => void
  isLoading: boolean
  defaultValues: Record<number, string | number | boolean>
}

export const FormForm = ({
  questions,
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: FormFormProps) => {
  const formSchema = generateFormSchemaFromQuestions(questions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const renderField = (question: Question, field: ControllerRenderProps<{
    [x: number]: string | number | boolean;
  }>) => {
    switch (question.type) {
      case QuestionTypes.TEXT:
        return <Input {...field}
          disabled={isDateQuestion(question.type, question.title) || isEmailQuestion(question.type, question.title)}
        />;
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
