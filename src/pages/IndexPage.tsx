import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { TemplateCard } from '@/components/template/TemplateCard';
import { Badge } from '@/components/ui/badge';
import { SimpleTemplateTables } from '@/components/template/SimpleTemplatesTable';
import { useTags } from '@/hooks/useTagsTopics';
import { getRecentTemplatesQuery, getTemplatesBySubmissionsQuery } from '@/queries/template';
import { useTranslation } from 'react-i18next';


export const IndexPage = () => {
  const {t} = useTranslation();
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
      <main className="flex flex-col flex-grow mt-8 gap-12">
        <section className="">
          <h1 className="text-3xl font-bold mb-8 text-center text-neutral-950 dark:text-neutral-50">
            {t('index.latestTemplates')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        <section className=''>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </section>

        <section id="popular_templates">
          <SimpleTemplateTables
            templates={popularTemplates}
            title={t('index.popularTemplates.title')}
            description={t('index.popularTemplates.description')}
            onItemClicked={handleItemClick}
          />
        </section>
      </main>
    </>
  )
}
