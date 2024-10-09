import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewTemplateForm } from "@/components/template/NewTemplateForm";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTagsQuery, getTopicsQuery } from '@/queries/template';


export const IndexPage = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)
  const topicsQuery = useSuspenseQuery(getTopicsQuery)
  const tags = tagsQuery.data.data.data
  const topics = topicsQuery.data.data.data
  console.log({tags, topics})
  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button>Create Template</Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let's create a new template</DialogTitle>
            <DialogDescription>
              Create a new template to share with the community
            </DialogDescription>
          </DialogHeader>
          <NewTemplateForm topics={topics} tags={tags}/>
        </DialogContent>
      </Dialog>
    </>
  )
}
