import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import { newTemplateSchema } from "@/constants/templates/template"
import { NewTemplateFormValues } from "@/interfaces/template"


export const NewTemplateForm = () => {
  // const [availableTags, setAvailableTags] = useState<string[]>(['React', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js'])

  const form = useForm<NewTemplateFormValues>({
    resolver: zodResolver(newTemplateSchema),
    defaultValues: {
      title: '',
      description: '',
      topic: '',
      isPublic: true,
    },
  })

  const topics = ['Education', 'Business', 'Technology', 'Health', 'Entertainment']

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     form.setValue('image', file)
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  // const handleAddTag = (value: string) => {
  //   if (value && !tags.includes(value)) {
  //     setTags(prevTags => [...prevTags, value])
  //     if (!availableTags.includes(value)) {
  //       setAvailableTags(prevAvailableTags => [...prevAvailableTags, value])
  //     }
  //     setNewTag('')
  //   }
  // }

  // const handleRemoveTag = (tagToRemove: string) => {
  //   setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove))
  // }

  function onSubmit(values: NewTemplateFormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter template title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter template description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value.length && "text-muted-foreground"
                      )}
                    >
                      {field.value.length > 0
                        ? `${field.value.length} selected`
                        : "Select tags"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search tag..." />
                    <CommandEmpty>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          const newTag = form.getValues('tags').join('')
                          if (newTag && !availableTags.includes(newTag)) {
                            setAvailableTags([...availableTags, newTag])
                            field.onChange([...field.value, newTag])
                          }
                        }}
                      >
                        Create new tag
                      </Button>
                    </CommandEmpty>
                    <CommandGroup>
                      {availableTags.map((tag) => (
                        <CommandItem
                          value={tag}
                          key={tag}
                          onSelect={() => {
                            field.onChange(
                              field.value.includes(tag)
                                ? field.value.filter((value) => value !== tag)
                                : [...field.value, tag]
                            )
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value.includes(tag) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {tag}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="mt-2 flex flex-wrap gap-2">
                {field.value.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
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
        /> */}

        <FormField
          control={form.control}
          name="isPublic"
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
                  Make this template public
                </FormLabel>
                <FormDescription>
                  This will allow any authenticated user to fill your template.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e)
                    field.onChange(e.target.files?.[0])
                  }}
                />
              </FormControl>
              {imagePreview && (
                <Card className="mt-2">
                  <CardContent className="p-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  </CardContent>
                </Card>
              )}
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Create Template</Button>
      </form>
    </Form>
  )
}
