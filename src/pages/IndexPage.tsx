import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TemplateForm } from "@/components/template/TemplateForm";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTagsQuery, getTopicsQuery } from '@/queries/template';
import { ScrollArea } from '@/components/ui/scroll-area';


export const IndexPage = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)
  const topicsQuery = useSuspenseQuery(getTopicsQuery)
  const tags = tagsQuery.data.data.data
  const topics = topicsQuery.data.data.data

  return (
    <>
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
              <TemplateForm topics={topics} tags={tags}/>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
