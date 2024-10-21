import { Tag, Topic } from "@/interfaces/template"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { TemplateForm } from "./TemplateForm"


interface NewTemplateDialogProps {
  topics: Topic[]
  tags: Tag[]
  onSuccess: (templateId: number) => void
}

export const NewTemplateDialog = ({
  topics,
  tags,
  onSuccess,
}: NewTemplateDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Template</Button>
      </DialogTrigger>
      <DialogContent className='p-1'>
        <ScrollArea className='max-h-[80vh] p-5'>
          <div className='m-2'>
            <DialogHeader>
              <DialogTitle>Let's create a new template</DialogTitle>
              <DialogDescription>
                Create a new template to share with the community
              </DialogDescription>
            </DialogHeader>
            <TemplateForm
              topics={topics}
              tags={tags}
              onSuccessful={onSuccess}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
