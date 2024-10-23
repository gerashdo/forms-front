import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import { useTemplateForm } from "@/hooks/template/useTemplateForm";
import { cn } from "@/lib/utils";
import { NewTemplateFormValues, Tag, Topic } from "@/interfaces/template";
import { ALLOWED_IMAGE_TYPES } from "@/constants/templates/template";
import { CheckIcon, ChevronsUpDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";


interface NewTemplateFormProps {
  topics: Topic[]
  tags: Tag[]
  onCancel?: () => void
  onSuccessful?: (id: number) => void
  defaultValues?: NewTemplateFormValues
  isEditing?: boolean
  image?: string
  templateId?: number
}

export const TemplateForm = ({
  topics,
  tags,
  onCancel,
  onSuccessful,
  defaultValues,
  isEditing = false,
  image,
  templateId,
}: NewTemplateFormProps) => {
  const {t} = useTranslation()
  const [tagsIsOpen, setTagsIsOpen] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | undefined>(image)

  const onSuccess = (templateId: number) => {
    setTagsIsOpen(false)
    onSuccessful?.(templateId)
  }

  const {form, onSubmit, isLoading} = useTemplateForm({onSuccess, defaultValues, isEditing, templateId})

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('image', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.templateForm.title")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("components.templateForm.titlePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topicId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.templateForm.topic")}
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("components.templateForm.topicPlaceholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id.toString()}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                {t("components.templateForm.description")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("components.templateForm.descriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.templateForm.tags")}
              </FormLabel>
              <Popover open={tagsIsOpen} onOpenChange={setTagsIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                      )}
                    >
                      {field.value.length > 0
                        ? `${field.value.length} ${t("components.templateForm.selected")}`
                        : t("components.templateForm.selectTags")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={t("components.templateForm.search")} />
                    <CommandList>
                      <CommandEmpty>
                        {t("components.templateForm.noTags")}
                      </CommandEmpty>
                      <CommandGroup>
                        {tags.map((tag) =>(
                          <CommandItem
                            key={tag.id}
                            value={tag.name}
                            onSelect={() => {
                              field.onChange(
                                field.value.includes(tag.id)
                                  ? field.value
                                  : [...field.value, tag.id]
                                )
                              setTagsIsOpen(false)
                              }
                            }
                          >
                            {tag.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(tag.id) ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="mt-2 flex flex-wrap gap-2">
                {field.value.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1">
                    {tags.find((t) => t.id === tag)?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-4 w-4 p-0"
                      onClick={() => field.onChange(field.value.filter((t) => t !== tag))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.templateForm.image")}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ALLOWED_IMAGE_TYPES.join(',')}
                  onChange={(e) => {
                    handleImageChange(e)
                    field.onChange(e.target.files?.[0])
                  }}
                />
              </FormControl>
              {imagePreview && (
                <Card className="mt-2 w-1/3">
                  <CardContent className="p-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto"
                    />
                  </CardContent>
                </Card>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t("components.templateForm.publicLabel")}
                </FormLabel>
                <FormDescription>
                  {t("components.templateForm.publicDescription")}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-3 flex-row-reverse col-span-2">
          {onCancel && (<Button type="button" variant="outline" onClick={onCancel}>
            {t("components.templateForm.cancel")}
          </Button>)}
          <Button
            type="submit"
            className="col-span-2"
            disabled={isLoading}
          >
            {isLoading ?
              t("components.templateForm.submitting") :
              t("components.templateForm.save")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
