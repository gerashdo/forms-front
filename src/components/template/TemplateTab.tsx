import { HTMLAttributes, useState } from "react"
import { Link } from "@tanstack/react-router"
import { PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TemplateCardData } from "./TemplateCardData"
import { TemplateForm } from "./TemplateForm"
import { Tag, Template, Topic } from "@/interfaces/template"


interface TemplateTabProps extends HTMLAttributes<HTMLDivElement> {
  template: Template
  topics: Topic[]
  tags: Tag[]
}

export const TemplateTab = ({
  template,
  topics,
  tags,
  className,
  ...props
}: TemplateTabProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleOnSuccessEditTemplate = () => {
    setIsEditing(false);
  }

  return (
      <Card className={className} {...props}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure the general settings for the template</CardDescription>
          </div>
          <div className="flex gap-2">
            <Link to={`/templates/${template.id}/forms/submit`}>
              <Button type="button">
                Answer Template Form
              </Button>
            </Link>
            {!isEditing && (
              <Button type="button" variant="ghost" onClick={() => setIsEditing(true)}>
                Edit Template
                <PencilIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        {isEditing ? (
          <CardContent>
            <TemplateForm
              defaultValues={{
                title: template.title,
                description: template.description,
                tags: template.Tags.map((tag) => tag.id),
                topicId: template.Topic.id,
                isPublic: template.isPublic,
                image: undefined,
              }}
              topics={topics}
              tags={tags}
              isEditing
              templateId={template.id}
              onCancel={() => setIsEditing(false)}
              image={template.image || undefined}
              onSuccessful={handleOnSuccessEditTemplate}
            />
          </CardContent>
        ) : (
          <TemplateCardData template={template} />
        )}
      </Card>
  )
}
