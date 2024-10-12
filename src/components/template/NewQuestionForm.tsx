import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { newQuestionSchema, questionTypeLabels } from "@/constants/templates/question";
import { NewQuestionFormValues, QuestionTypes } from "@/interfaces/question";


type NewQuestionFormProps = {
  defaultValues: NewQuestionFormValues
  onSumbit: (values: NewQuestionFormValues) => void
  onCancel: () => void
}

export const NewQuestionForm = ({defaultValues, onSumbit, onCancel}: NewQuestionFormProps) => {

  const questionForm = useForm<NewQuestionFormValues>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues,
  })

  const onQuestionSubmit = (values: NewQuestionFormValues) => {
    console.log("Question values:", values)
    onSumbit(values)
    questionForm.reset()
  }

  return (
    <Form {...questionForm}>
      <form onSubmit={questionForm.handleSubmit(onQuestionSubmit)} className="space-y-4">
        <FormField
          control={questionForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={questionForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={questionForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(QuestionTypes).map((val) => (
                    <SelectItem key={val} value={val}>
                      {questionTypeLabels[val]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={questionForm.control}
          name="visible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Visible
                </FormLabel>
                <FormDescription>
                  Make this question visible in the template.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-3 flex-row-reverse">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Question</Button>
        </div>
      </form>
    </Form>
  )
}
