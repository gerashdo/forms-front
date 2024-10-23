import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { TemplateCard } from '@/components/template/TemplateCard';
import { Badge } from '@/components/ui/badge';
import { SimpleTemplateTables } from '@/components/template/SimpleTemplatesTable';
import { useTags } from '@/hooks/useTagsTopics';
import { getRecentTemplatesQuery, getTemplatesBySubmissionsQuery } from '@/queries/template';


export const IndexPage = () => {
  const navigation = useNavigate();
  const tags = useTags();
  const recentTemplatesQuery = useSuspenseQuery(getRecentTemplatesQuery);
  const templatesBySubmissionQuery = useSuspenseQuery(getTemplatesBySubmissionsQuery);
  const latestTemplates = recentTemplatesQuery.data.data;
  const popularTemplates = templatesBySubmissionQuery.data.data;

  const handleItemClick = (id: number) => {
    navigation({to: `/templates/${id}`});
  }

  return (
    <>
      <main className="flex-grow mt-4">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-neutral-950 dark:text-neutral-50">Latest Templates</h1>
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
          <SimpleTemplateTables
            templates={popularTemplates}
            title="Popular Templates"
            description="Here are the most popular templates created by the community"
            onItemClicked={handleItemClick}
          />
        </section>
      </main>
    </>
  )
}
