import { useSuspenseQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TemplateForm } from "@/components/template/TemplateForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TemplateCard } from '@/components/template/TemplateCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getRecentTemplatesQuery, getTagsQuery, getTopicsQuery } from '@/queries/template';


export const IndexPage = () => {
  const tagsQuery = useSuspenseQuery(getTagsQuery)
  const topicsQuery = useSuspenseQuery(getTopicsQuery)
  const recentTemplatesQuery = useSuspenseQuery(getRecentTemplatesQuery)
  const tags = tagsQuery.data.data.data
  const topics = topicsQuery.data.data.data
  const latestTemplates = recentTemplatesQuery.data.data

  const popularTemplates = [
    { id: 1, name: "Customer Feedback", submissions: 1500 },
    { id: 2, name: "Event Registration", submissions: 1200 },
    { id: 3, name: "Job Application", submissions: 1000 },
    { id: 4, name: "Course Evaluation", submissions: 800 },
    { id: 5, name: "Market Research Survey", submissions: 750 },
  ]

  return (
    <>
      <Dialog>
        <div className='flex flex-row-reverse'>
          <DialogTrigger asChild>
            <Button>Create Template</Button>
          </DialogTrigger>
        </div>
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
      <main className="flex-grow mt-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Latest Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        <section className='mb-8'>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Templates</CardTitle>
              <CardDescription>Check out the most popular templates created by the community</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Submissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell className="text-right">{template.submissions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
