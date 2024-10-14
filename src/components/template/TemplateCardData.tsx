import { Template } from "@/interfaces/template"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlobeIcon, LockIcon } from "lucide-react"
import { UsersList } from "./UsersList"


interface TemplateCardDataProps {
  template: Template
}

export const TemplateCardData = ({template}: TemplateCardDataProps) => {
  return (
    <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Title</h3>
        <p className="text-sm text-muted-foreground">{template.title}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Topic</h3>
        <p className="text-sm text-muted-foreground">{template.Topic.name}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Upload Image</h3>
        {template.image ? (
          <img src={template.image} alt={template.title} className="w-full h-32 object-cover rounded-md" />
        ) : (
          <p className="text-sm text-muted-foreground">No image uploaded</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Tags</h3>
          {template.Tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
          ))}
        </div>
      </div>
      {template.isPublic ? (
        <div className="bg-green-100 border border-green-200 rounded-md p-4 flex items-center space-x-2">
          <GlobeIcon className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-600 font-medium">This template is public and can be filled by any authenticated user.</p>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 flex items-center space-x-2">
          <LockIcon className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-600 font-medium">This template is private. Only allowed users can fill it.</p>
        </div>
      )}
      {!template.isPublic && (
        <div className="space-y-2 col-span-2">
          <UsersList />
        </div>
      )}
    </CardContent>
  )
}
