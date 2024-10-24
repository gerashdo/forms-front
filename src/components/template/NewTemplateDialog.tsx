import { Tag, Topic } from "@/interfaces/template"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { TemplateForm } from "./TemplateForm"
import { useTranslation } from "react-i18next"


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
  const {t} = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {t('components.newTemplateDialog.create')}
        </Button>
      </DialogTrigger>
      <DialogContent className='p-1'>
        <ScrollArea className='max-h-[80vh] p-5'>
          <div className='m-2'>
            <DialogHeader className="mb-4">
              <DialogTitle>
                {t('components.newTemplateDialog.title')}
              </DialogTitle>
              <DialogDescription>
                {t('components.newTemplateDialog.description')}
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
